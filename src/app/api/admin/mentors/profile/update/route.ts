import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import UserModel from "@/models/User";
import MentorProfileModel from "@/models/MentorProfile";

const BodySchema = z.object({
  userId: z.string().min(1),
  headline: z.string().max(200),
  companies: z.string().max(200),
  location: z.string().max(120).nullable(),
  description: z.string().max(2000),
  skills: z.array(z.string().max(50)).max(20),
  imageUrl: z.string().url().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
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
  const user = await UserModel.findById(parsed.data.userId).exec();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = parsed.data;
  await MentorProfileModel.findOneAndUpdate(
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
  ).exec();

  if (data.linkedin) {
    user.linkedinProfileUrl = data.linkedin;
    await user.save();
  }

  return NextResponse.json({ ok: true });
}

