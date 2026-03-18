import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";

const BodySchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  const email = parsed.data.email.trim().toLowerCase();
  const user = await UserModel.findOne({ email }).exec();

  if (!user || (user.role !== "MENTOR" && user.role !== "MENTOR_PENDING")) {
    return NextResponse.json({ status: "not_found" }, { status: 200 });
  }

  if (user.role === "MENTOR_PENDING" || user.accountStatus === "PENDING_APPLICATION") {
    return NextResponse.json({ status: "pending_approval" }, { status: 200 });
  }

  if (user.accountStatus === "REJECTED" || user.accountStatus === "SUSPENDED") {
    return NextResponse.json(
      { status: "blocked", reason: user.accountStatus.toLowerCase() },
      { status: 200 }
    );
  }

  if (!user.passwordHash) {
    return NextResponse.json({ status: "needs_password" }, { status: 200 });
  }

  return NextResponse.json({ status: "has_password" }, { status: 200 });
}

