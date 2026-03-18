import React from "react";
import EditBlogPageClient from "./client-page";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { getSessionFromRequestCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Admin | Edit Blog",
};

export default async function EditBlogPage({ params }: { params: { id: string } }) {
    const session = await getSessionFromRequestCookies();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN" && session.role !== "MENTOR")) {
        redirect("/auth");
    }

    await connectDB();

    const blogId = Number(params.id);
    const blog = await BlogModel.findOne({ id: blogId }).lean().exec();

    if (!blog) {
        redirect("/admin/blogs"); // or 404
    }

    // Map to form data
    const initialData = {
        title: blog.title || "",
        slug: blog.slug || "",
        thumbnail: blog.thumbnailUrl || "",
        category: blog.descriptionDetails?.category || "",
        tags: blog.descriptionDetails?.tags?.join(", ") || "",
        // @ts-ignore
        content: blog.rawContent || "No content found. Please rewrite.",
        seoDescription: blog.descriptionDetails?.seoDescription || "",
        status: blog.status || "DRAFT",
    };

    return <EditBlogPageClient id={blogId} initialData={initialData} />;
}
