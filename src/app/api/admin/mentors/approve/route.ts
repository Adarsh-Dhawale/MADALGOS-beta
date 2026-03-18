import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
  id: z.string().min(1),
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
  const user = await UserModel.findById(parsed.data.id).exec();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (user.role !== "MENTOR_PENDING") {
    return NextResponse.json({ error: "User is not a pending mentor" }, { status: 400 });
  }

  user.role = "MENTOR";
  user.accountStatus = "ACTIVE";
  user.mentorCredentialToken = null;
  user.mentorCredentialTokenExpiresAt = null;
  await user.save();

  return NextResponse.json({ ok: true });
}

