import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
  id: z.number().int().positive(),
  reason: z.string().min(3).max(500).optional(),
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
  const blog = await BlogModel.findOne({ id: parsed.data.id }).exec();
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

  blog.status = "REJECTED";
  blog.reviewStatus = "REJECTED";
  blog.reviewer = session.role;
  blog.reviewDate = new Date().toISOString();
  blog.rejectionReason = parsed.data.reason?.trim() || null;
  await blog.save();

  return NextResponse.json({ ok: true });
}

