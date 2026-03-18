import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";

export async function GET() {
  await connectDB();
  const docs = await TestimonialModel.find({ status: "APPROVED" })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  return NextResponse.json({
    testimonials: docs.map((t: any) => ({
      name: t.name,
      role: t.role,
      content: t.content,
      image: t.imageUrl ?? null,
    })),
  });
}

