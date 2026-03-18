import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import UserModel from "@/models/User";
import MentorProfileModel from "@/models/MentorProfile";

const BodySchema = z.object({
  userId: z.string().min(1),
  reason: z.string().min(3).max(500),
});

async function requireAdmin() {
  const session = await getSessionFromRequestCookies();
  if (!session) return null;
  if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") return null;
  return session;
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  const user = await UserModel.findById(parsed.data.userId).lean().exec();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await MentorProfileModel.updateOne(
    { userId: user._id },
    { $set: { reviewStatus: "REJECTED", rejectionReason: parsed.data.reason.trim() } }
  ).exec();

  return NextResponse.json({ ok: true });
}

