import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    thumbnail: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    content: z.string().min(1),
    seoDescription: z.string().max(160).optional(),
    status: z.enum(["DRAFT", "PENDING_REVIEW", "PUBLISHED", "REJECTED"]),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getSessionFromRequestCookies();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN" && session.role !== "MENTOR")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    await connectDB();

    const blog = await BlogModel.findOne({ id: Number(params.id) }).exec();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // If MENTOR, ensure they only edit their own blogs
    if (session.role === "MENTOR" && blog.authorId !== session.userId) {
        return NextResponse.json({ error: "Forbidden: Can only edit your own blogs" }, { status: 403 });
    }

    blog.title = parsed.data.title;
    blog.slug = parsed.data.slug;
    blog.thumbnailUrl = parsed.data.thumbnail;
    blog.status = parsed.data.status;

    // Update embedded DescriptionDetails
    blog.descriptionDetails = {
        ...blog.descriptionDetails, // Keep existing blocks or other fields safe
        tags: parsed.data.tags ? parsed.data.tags.split(",").map((t: string) => t.trim()) : [],
        category: parsed.data.category,
        seoDescription: parsed.data.seoDescription,
    } as any;

    // Store raw content
    // @ts-ignore - appending rawContent loosely to align with the new schema without breaking typed models
    blog.rawContent = parsed.data.content;

    const isAdmin = session.role === "ADMIN" || session.role === "SUPER_ADMIN";
    const finalStatus =
        isAdmin && parsed.data.status === "PENDING_REVIEW" ? "PUBLISHED" : parsed.data.status;

    // Review Status logic
    blog.status = finalStatus;

    if (finalStatus === "DRAFT") {
        blog.reviewStatus = "DRAFT";
    } else if (finalStatus === "PENDING_REVIEW") {
        blog.reviewStatus = "PENDING_REVIEW";
    }
    // If moving straight to PUBLISHED and they are ADMIN, automatically approve
    if (finalStatus === "PUBLISHED" && isAdmin) {
        blog.reviewStatus = "APPROVED";
        blog.reviewer = session.role;
        blog.reviewDate = new Date().toISOString();
    }

    await blog.save();

    return NextResponse.json({ ok: true });
}
