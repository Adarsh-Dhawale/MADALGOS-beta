import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { getSessionFromRequestCookies } from "@/lib/auth";

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
  const verifiedParam = url.searchParams.get("verified");
  const status = url.searchParams.get("status");

  await connectDB();

  const filter: Record<string, unknown> = {
    role: { $in: ["MENTOR", "MENTOR_PENDING"] },
  };
  if (verifiedParam === "true") filter.verificationStatus = "VERIFIED";
  if (verifiedParam === "false") filter.verificationStatus = "UNVERIFIED";
  if (status) filter.accountStatus = status;

  const docs = await UserModel.find(filter).sort({ createdAt: -1 }).lean().exec();
  return NextResponse.json({
    mentors: docs.map((u) => ({
      id: String(u._id),
      email: u.email,
      username: u.username,
      role: u.role,
      accountStatus: u.accountStatus,
      verificationStatus: u.verificationStatus,
      linkedinProfileUrl: u.linkedinProfileUrl,
      createdAt: u.createdAt,
    })),
  });
}

const VerifyBody = z.object({ verified: z.boolean() });

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const json = await req.json().catch(() => null);
  const parsed = VerifyBody.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  const user = await UserModel.findById(id).exec();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  user.verificationStatus = parsed.data.verified ? "VERIFIED" : "UNVERIFIED";
  await user.save();
  return NextResponse.json({ ok: true });
}

