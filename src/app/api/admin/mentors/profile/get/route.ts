import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import UserModel from "@/models/User";
import MentorProfileModel from "@/models/MentorProfile";

const QuerySchema = z.object({
  userId: z.string().min(1),
});

async function requireAdmin() {
  const session = await getSessionFromRequestCookies();
  if (!session) return null;
  if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") return null;
  return session;
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({ userId: url.searchParams.get("userId") });
  if (!parsed.success) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  await connectDB();
  const user = await UserModel.findById(parsed.data.userId).lean().exec();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const profile =
    (await MentorProfileModel.findOne({ userId: user._id }).lean().exec()) ??
    ({
      userId: user._id,
      headline: "",
      companies: "",
      location: null,
      description: "",
      skills: [],
      imageUrl: null,
      linkedin: user.linkedinProfileUrl ?? null,
      reviewStatus: "PENDING_REVIEW",
      rejectionReason: null,
    } as any);

  return NextResponse.json({
    ok: true,
    user: {
      id: String(user._id),
      email: user.email,
      username: user.username,
      verificationStatus: user.verificationStatus,
    },
    profile: {
      headline: profile.headline ?? "",
      companies: profile.companies ?? "",
      location: profile.location ?? null,
      description: profile.description ?? "",
      skills: Array.isArray(profile.skills) ? profile.skills : [],
      imageUrl: profile.imageUrl ?? null,
      linkedin: profile.linkedin ?? user.linkedinProfileUrl ?? null,
      reviewStatus: profile.reviewStatus ?? "PENDING_REVIEW",
      rejectionReason: profile.rejectionReason ?? null,
    },
  });
}

