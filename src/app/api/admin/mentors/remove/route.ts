import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import MentorModel from "@/models/Mentor";

const BodySchema = z.object({
  id: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await getSessionFromRequestCookies();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  // Hard delete mentor records tied to this user profileId (user account kept).
  await MentorModel.deleteMany({ profileId: `user:${parsed.data.id}` }).exec();

  return NextResponse.json({ ok: true });
}

