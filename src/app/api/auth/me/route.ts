import { NextResponse } from "next/server";
import { getSessionFromRequestCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function GET() {
  const session = await getSessionFromRequestCookies();
  if (!session) return NextResponse.json({ user: null }, { status: 200 });

  await connectDB();
  const user = await UserModel.findById(session.uid).lean().exec();
  if (!user) return NextResponse.json({ user: null }, { status: 200 });

  return NextResponse.json({
    user: {
      id: String(user._id),
      email: user.email,
      username: user.username,
      role: user.role,
      accountStatus: user.accountStatus,
      verificationStatus: user.verificationStatus,
      linkedinProfileUrl: user.linkedinProfileUrl,
      profileCompleted: user.profileCompleted,
    },
  });
}

