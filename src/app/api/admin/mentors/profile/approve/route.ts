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

function splitCompanies(input: string): string[] {
  return input
    .split(/[,|]/g)
    .map((s) => s.trim())
    .filter(Boolean);
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
  if (!profile) return NextResponse.json({ error: "Mentor profile not found" }, { status: 404 });

  const completed =
    !!profile.headline?.trim() &&
    !!profile.companies?.trim() &&
    !!(profile.location ?? "").trim() &&
    !!profile.description?.trim() &&
    Array.isArray(profile.skills) &&
    profile.skills.length > 0 &&
    !!(profile.linkedin ?? user.linkedinProfileUrl ?? "").trim();

  if (!completed) {
    return NextResponse.json({ error: "Mentor profile is not complete yet" }, { status: 400 });
  }

  // Mark profile approved (still not visible on site until publish step).
  await MentorProfileModel.updateOne(
    { userId: user._id },
    { $set: { reviewStatus: "APPROVED", rejectionReason: null } }
  ).exec();

  const existing = await MentorModel.findOne({ profileId: `user:${String(user._id)}` })
    .select("id interviewerId")
    .lean()
    .exec();

  let mentorId = existing?.id;
  let interviewerId = existing?.interviewerId;
  if (!mentorId || !interviewerId) {
    const max = await MentorModel.findOne().sort({ id: -1 }).select("id").lean().exec();
    const next = (max?.id ?? 0) + 1;
    mentorId = next;
    interviewerId = next;
  }

  const companies = splitCompanies(profile.companies);
  const currentCompanyName = companies[0] ?? "";

  const headline = profile.headline.trim();
  const roleGuess = headline;

  await MentorModel.updateOne(
    { profileId: `user:${String(user._id)}` },
    {
      $set: {
        id: mentorId,
        interviewerId,
        linkedin: profile.linkedin ?? user.linkedinProfileUrl ?? null,
        location: profile.location ?? null,
        description: profile.description ?? null,
        skills: profile.skills ?? [],
        joiningDate: profile.updatedAt ? new Date(profile.updatedAt).toISOString() : new Date().toISOString(),
        posterLink: profile.imageUrl ?? null,
        isVerified: false, // explicit publish step will set true
        isActive: false, // explicit publish step will set true
        approvalStatus: "PENDING",
        profileId: `user:${String(user._id)}`,
        careerHistory: {
          currentCompany: {
            role: roleGuess,
            startTime: "",
            endTime: "",
            companyName: currentCompanyName,
          },
          previousCompanies: companies.slice(1, 4).map((c) => ({
            role: "",
            startTime: "",
            endTime: "",
            companyName: c,
          })),
        },
        interviewer: {
          firstName: user.username || user.email,
          lastName: null,
          dispImageLink: profile.imageUrl ?? null,
        },
      },
    },
    { upsert: true }
  ).exec();

  return NextResponse.json({ ok: true });
}

