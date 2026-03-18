import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getSessionFromRequestCookies } from "@/lib/auth";
import MentorModel from "@/models/Mentor";

const BodySchema = z.object({
  id: z.number().int().positive(),
  action: z.enum(["PUBLISH", "UNPUBLISH"]),
});

export async function POST(req: Request) {
  const session = await getSessionFromRequestCookies();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await connectDB();
  const mentor = await MentorModel.findOne({ id: parsed.data.id }).exec();
  if (!mentor) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (parsed.data.action === "PUBLISH") {
    mentor.isActive = true;
    mentor.approvalStatus = "APPROVED";
    mentor.isVerified = true;
  } else {
    mentor.isActive = false;
    mentor.approvalStatus = "UNPUBLISHED";
    mentor.isVerified = false;
  }

  await mentor.save();

  return NextResponse.json({ ok: true });
}

