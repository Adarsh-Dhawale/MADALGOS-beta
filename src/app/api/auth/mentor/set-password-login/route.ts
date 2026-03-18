import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { createSessionToken, setSessionCookie, signPassword } from "@/lib/auth";

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  const email = parsed.data.email.trim().toLowerCase();
  const user = await UserModel.findOne({ email }).exec();

  if (!user || user.role !== "MENTOR") {
    return NextResponse.json({ error: "Mentor account not found" }, { status: 400 });
  }

  if (user.passwordHash) {
    return NextResponse.json({ error: "Password already set. Please sign in instead." }, { status: 400 });
  }

  if (user.accountStatus === "REJECTED" || user.accountStatus === "SUSPENDED") {
    return NextResponse.json({ error: "Account is not active" }, { status: 403 });
  }

  user.passwordHash = await signPassword(parsed.data.password);
  user.authProvider = user.authProvider === "google" ? "password+google" : "password";
  user.accountStatus = "ACTIVE";
  user.lastLoginAt = new Date();
  await user.save();

  const token = createSessionToken({ uid: String(user._id), role: user.role });
  const res = NextResponse.json({ ok: true, role: user.role });
  setSessionCookie(res, token);
  return res;
}

