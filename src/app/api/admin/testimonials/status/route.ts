import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
    id: z.string().min(1),
    status: z.enum(["PENDING", "PENDING_REVIEW", "APPROVED", "REJECTED"]),
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
    const testimonial = await TestimonialModel.findById(parsed.data.id).exec();
    if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });

    testimonial.status = parsed.data.status;
    await testimonial.save();

    return NextResponse.json({ ok: true });
}
