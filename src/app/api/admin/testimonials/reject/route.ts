import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
  id: z.string().min(1),
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
  const t = await TestimonialModel.findById(parsed.data.id).exec();
  if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });

  t.status = "REJECTED";
  t.rejectionReason = parsed.data.reason;
  await t.save();
  return NextResponse.json({ ok: true });
}

