import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { connectDB } from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Simple in-memory rate limit: one message per email per hour (resets on restart)
const lastSentByEmail = new Map<string, number>();
const ONE_HOUR_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Invalid method" }, { status: 405 });
  }

  try {
    const { name, email, phone, message, token, subject, organization } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailTrimmed = String(email).trim();
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailRegex.test(emailTrimmed)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
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
    const lastSent = lastSentByEmail.get(emailTrimmed);
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
          email: emailTrimmed,
          subject: subject || "Contact form",
          message,
          phone: phone || undefined,
          organization: organization || undefined,
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
    const fromEmail = "helpdesk@MADAlgos.in";
    const toEmail = "contact@madalgos.in";
    const replyTo = "contact@madalgos.in";

    const inquiryEmail = {
      from: fromEmail,
      to: toEmail,
      replyTo,
      subject: `New Contact Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${emailTrimmed}
Phone: ${phone || "N/A"}
${organization ? `Organization: ${organization}\n` : ""}

Message:
${message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;padding:24px;margin:0}.card{background:rgba(30,41,59,0.8);border-radius:16px;padding:24px;max-width:560px;border:1px solid rgba(255,255,255,0.1)}h1{font-size:20px;margin:0 0 16px;color:#14b8a6}.row{margin:8px 0;font-size:14px}.label{color:#94a3b8;font-weight:600}.value{color:#f8fafc}.msg{background:rgba(15,23,42,0.6);padding:16px;border-radius:12px;margin-top:16px;white-space:pre-wrap}</style></head>
<body>
<div class="card">
  <h1>New Contact Inquiry</h1>
  <div class="row"><span class="label">Name:</span> <span class="value">${escapeHtml(name)}</span></div>
  <div class="row"><span class="label">Email:</span> <span class="value">${escapeHtml(emailTrimmed)}</span></div>
  <div class="row"><span class="label">Phone:</span> <span class="value">${escapeHtml(phone || "—")}</span></div>
  ${organization ? `<div class="row"><span class="label">Organization:</span> <span class="value">${escapeHtml(organization)}</span></div>` : ""}
  <div class="msg">${escapeHtml(message)}</div>
</div>
<p style="font-size:12px;color:#64748b;margin-top:16px">Replies to this email will go to contact@madalgos.in</p>
</body>
</html>
      `.trim(),
    };

    try {
      await sgMail.send(inquiryEmail);
    } catch (sgErr: unknown) {
      const err = sgErr as { response?: { body?: unknown; statusCode?: number } };
      console.error("SendGrid error:", {
        statusCode: err.response?.statusCode,
        body: err.response?.body,
        message: err instanceof Error ? err.message : String(err),
      });
      return NextResponse.json(
        { error: "Email service failed. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    // Send confirmation to the user who submitted (with reply-to so they can reply to us)
    try {
      await sgMail.send({
        from: fromEmail,
        to: emailTrimmed,
        replyTo: replyTo,
        subject: "We received your message - MAD Algos",
        text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you within 48 hours.\n\nBest regards,\nMAD Algos Team`,
        html: `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;padding:24px;color:#1e293b"><p>Hi ${escapeHtml(name)},</p><p>Thank you for reaching out. We have received your message and will get back to you within 48 hours.</p><p>Replies to this email go to contact@MADAlgos.in.</p><p>Best regards,<br/>MAD Algos Team</p></body></html>`,
      });
    } catch (confirmErr) {
      console.warn("Confirmation email failed (inquiry was sent):", confirmErr);
    }

    lastSentByEmail.set(emailTrimmed, now);
    console.log(`Contact inquiry saved and email sent for ${name}`);

    return NextResponse.json(
      { message: "We have received your email and we will reach out to you within 48 hrs." },
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

