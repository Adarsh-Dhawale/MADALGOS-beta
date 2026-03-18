import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";

const BodySchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  linkedinProfileUrl: z.string().url(),
});

export async function POST(req: Request) {
  await connectDB();
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const email = parsed.data.email.trim().toLowerCase();

  const existing = await UserModel.findOne({ email }).lean().exec();
  if (existing) {
    return NextResponse.json(
      { error: "Email already exists. Please sign in or contact support." },
      { status: 409 }
    );
  }

  await UserModel.create({
    email,
    username: parsed.data.username.trim(),
    role: "MENTOR_PENDING",
    accountStatus: "PENDING_APPLICATION",
    verificationStatus: "UNVERIFIED",
    linkedinProfileUrl: parsed.data.linkedinProfileUrl.trim(),
    authProvider: null,
    passwordHash: null,
    googleId: null,
    mentorCredentialToken: null,
    mentorCredentialTokenExpiresAt: null,
    profileCompleted: false,
    lastLoginAt: null,
  });

  return NextResponse.json({ ok: true });
}

