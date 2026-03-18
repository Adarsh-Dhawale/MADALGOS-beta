import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
    id: z.number().int().positive(),
    status: z.enum(["DRAFT", "PENDING_REVIEW", "PUBLISHED", "REJECTED"]),
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
    const blog = await BlogModel.findOne({ id: parsed.data.id }).exec();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

    blog.status = parsed.data.status;
    blog.reviewStatus = parsed.data.status === "PUBLISHED" ? "APPROVED" : parsed.data.status;

    if (parsed.data.status === "PUBLISHED" || parsed.data.status === "REJECTED") {
        blog.reviewer = session.role;
        blog.reviewDate = new Date().toISOString();
    }
    if (parsed.data.status === "PUBLISHED") {
        blog.rejectionReason = null;
    }

    await blog.save();

    return NextResponse.json({ ok: true });
}
