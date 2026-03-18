import React from "react";
import BlogsPageClient from "./client-page";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import type { BlogDocument } from "@/models/Blog";

export const metadata = {
    title: "Admin | Blogs",
};

export default async function AdminBlogsPage() {
    await connectDB();

    const blogsRaw = await BlogModel.find().sort({ publishDate: -1 }).lean<BlogDocument[]>().exec();

    const mappedBlogs = blogsRaw.map(b => ({
        id: b.id,
        title: b.title,
        authorName: b.authorDetails?.firstName ?? `#${b.authorId}`,
        status: b.status || (b.reviewStatus === "APPROVED" ? "PUBLISHED" : b.reviewStatus === "PENDING_REVIEW" ? "PENDING_REVIEW" : b.reviewStatus === "REJECTED" ? "REJECTED" : "DRAFT"),
        publishDate: b.publishDate,
    }));

    return <BlogsPageClient initialBlogs={mappedBlogs} />;
}
