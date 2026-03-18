import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { createSessionToken, setSessionCookie, signPassword } from "@/lib/auth";

const BodySchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  const user = await UserModel.findOne({ mentorCredentialToken: parsed.data.token }).exec();
  if (!user) return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });

  if (!user.mentorCredentialTokenExpiresAt || user.mentorCredentialTokenExpiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  if (user.accountStatus !== "AWAITING_CREDENTIAL_SETUP") {
    return NextResponse.json({ error: "This account is not awaiting credential setup" }, { status: 400 });
  }

  user.passwordHash = await signPassword(parsed.data.password);
  user.authProvider = user.authProvider === "google" ? "password+google" : "password";
  user.role = "MENTOR";
  user.accountStatus = "ACTIVE";
  user.mentorCredentialToken = null;
  user.mentorCredentialTokenExpiresAt = null;
  user.lastLoginAt = new Date();
  await user.save();

  const token = createSessionToken({ uid: String(user._id), role: user.role });
  const res = NextResponse.json({ ok: true, role: user.role });
  setSessionCookie(res, token);
  return res;
}

