import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import MentorProfileModel from "@/models/MentorProfile";
import UserModel from "@/models/User";

async function requireMentor() {
  const session = await getSessionFromRequestCookies();
  if (!session || session.role !== "MENTOR") return null;
  return session;
}

export async function GET() {
  const session = await requireMentor();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const user = await UserModel.findById(session.uid).lean().exec();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
    user: {
      email: user.email,
      username: user.username,
      verificationStatus: user.verificationStatus,
    },
    profile,
  });
}

const PutSchema = z.object({
  headline: z.string().max(200),
  companies: z.string().max(200),
  location: z.string().max(120).nullable(),
  description: z.string().max(2000),
  skills: z.array(z.string().max(50)).max(20),
  imageUrl: z.string().url().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
});

export async function PUT(req: Request) {
  const session = await requireMentor();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = PutSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await connectDB();
  const user = await UserModel.findById(session.uid).exec();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = parsed.data;

  const profile = await MentorProfileModel.findOneAndUpdate(
    { userId: user._id },
    {
      $set: {
        headline: data.headline,
        companies: data.companies,
        location: data.location,
        description: data.description,
        skills: data.skills,
        imageUrl: data.imageUrl ?? null,
        linkedin: data.linkedin ?? user.linkedinProfileUrl ?? null,
        reviewStatus: "PENDING_REVIEW",
        rejectionReason: null,
      },
    },
    { upsert: true, new: true }
  ).lean();

  const profileCompleted =
    !!data.headline.trim() &&
    !!data.companies.trim() &&
    !!(data.location ?? "").trim() &&
    !!data.description.trim() &&
    Array.isArray(data.skills) &&
    data.skills.length > 0 &&
    !!(data.linkedin ?? user.linkedinProfileUrl ?? "").trim();
  // Image is optional; keep it out of "completion".

  user.profileCompleted = profileCompleted;

  if (data.linkedin) {
    user.linkedinProfileUrl = data.linkedin;
  }
  await user.save();

  return NextResponse.json({ ok: true, profile });
}

