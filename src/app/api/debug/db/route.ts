import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";

export async function GET() {
  await connectDB();

  const conn = mongoose.connection;
  const dbName = conn.name;
  const host = (conn as any).host ?? undefined;

  const latest = await BlogModel.find()
    .sort({ publishDate: -1 })
    .limit(5)
    .select({ id: 1, title: 1, status: 1, reviewStatus: 1, publishDate: 1 })
    .lean()
    .exec();

  return NextResponse.json({
    ok: true,
    db: { name: dbName, host },
    latestBlogs: latest,
  });
}

