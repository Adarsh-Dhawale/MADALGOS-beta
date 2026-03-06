import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { connectDB } from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";

// Simple in-memory rate limit: one message per email per hour (resets on restart)
const lastSentByEmail = new Map<string, number>();
const ONE_HOUR_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Invalid method" }, { status: 405 });
  }

  try {
    const { name, email, phone, message, token, subject } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // Verify ReCAPTCHA token server-side. Must use the SECRET key (from Google reCAPTCHA admin).
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!token) {
        return NextResponse.json(
          { error: "ReCAPTCHA verification failed." },
          { status: 400 }
        );
      }
      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(
            recaptchaSecret
          )}&response=${encodeURIComponent(token)}`,
        }
      );

      const data = (await verifyRes.json()) as {
        success: boolean;
        score?: number;
        "error-codes"?: string[];
      };
      if (!data.success) {
        console.warn("ReCAPTCHA verify failed:", data["error-codes"] ?? data);
        return NextResponse.json(
          { error: "ReCAPTCHA verification failed." },
          { status: 400 }
        );
      }
    }

    // Rate limit: one email per hour per address
    const now = Date.now();
    const lastSent = lastSentByEmail.get(email);
    if (lastSent && now - lastSent < ONE_HOUR_MS) {
      return NextResponse.json(
        { error: "You have already sent a message recently. Please try again later." },
        { status: 429 }
      );
    }

    // Cosmos DB (MongoDB API): best-effort save inquiry.
    // If Cosmos is down/misconfigured, we still send the email.
    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        await ContactInquiry.create({
          name,
          email,
          subject: subject || "Contact form",
          message,
          phone: phone || undefined,
        });
      } catch (dbErr) {
        console.error("Contact inquiry DB save failed:", dbErr);
      }
    }

    const apiKey = process.env.SendGridDevKey;
    if (!apiKey) {
      console.error("Missing SendGridDevKey in environment");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    // From address MUST be verified in SendGrid (Single Sender or Domain). 403 = not verified.
    // Kept hardcoded to match your previous repo.
    const fromEmail = "helpdesk@MADAlgos.in";
    const toEmail = "contact@madalgos.in";

    const emailPayload = {
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}
      `.trim(),
    };

    await sgMail.send(emailPayload);
    lastSentByEmail.set(email, now);

    console.log(`Contact inquiry saved and email sent for ${name}`);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

