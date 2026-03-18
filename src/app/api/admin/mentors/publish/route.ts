import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import UserModel from "@/models/User";
import MentorProfileModel from "@/models/MentorProfile";
import MentorModel from "@/models/Mentor";

const BodySchema = z.object({
  userId: z.string().min(1),
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
  if (user.role !== "MENTOR") return NextResponse.json({ error: "User is not a mentor" }, { status: 400 });
  if (user.verificationStatus !== "VERIFIED") {
    return NextResponse.json({ error: "Mentor must be verified first" }, { status: 400 });
  }

  const profile = await MentorProfileModel.findOne({ userId: user._id }).lean().exec();
  if (!profile || profile.reviewStatus !== "APPROVED") {
    return NextResponse.json({ error: "Mentor profile must be approved first" }, { status: 400 });
  }

  const mentor = await MentorModel.findOne({ profileId: `user:${String(user._id)}` }).exec();
  if (!mentor) {
    return NextResponse.json({ error: "Mentor record not synced yet. Approve profile first." }, { status: 400 });
  }

  // Toggle publish state: if currently approved & active, unpublish; otherwise publish.
  const isPublished = mentor.isActive && mentor.approvalStatus === "APPROVED";

  if (isPublished) {
    mentor.isActive = false;
    mentor.isVerified = false;
    mentor.approvalStatus = "UNPUBLISHED";
  } else {
    mentor.isActive = true;
    mentor.isVerified = true;
    mentor.approvalStatus = "APPROVED";
  }
  await mentor.save();

  return NextResponse.json({ ok: true, published: !isPublished });
}

