import React from "react";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import { getSessionFromRequestCookies } from "@/lib/auth";
import BlogReviewClient from "./review-client";

export const metadata = {
  title: "Admin | Blog Review",
};

export default async function AdminBlogReviewPage({ params }: { params: { id: string } }) {
  const session = await getSessionFromRequestCookies();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
    redirect("/auth");
  }

  const id = Number(params.id);
  if (Number.isNaN(id)) redirect("/admin/blogs");

  await connectDB();
  const blog = await BlogModel.findOne({ id }).lean().exec();
  if (!blog) redirect("/admin/blogs");

  return (
    <BlogReviewClient
      blog={{
        id: blog.id,
        title: blog.title,
        bannerImageLink: blog.bannerImageLink ?? null,
        authorName: blog.authorDetails?.firstName ?? "MadAlgos",
        publishDate: blog.publishDate,
        status: blog.status ?? "DRAFT",
        reviewStatus: blog.reviewStatus ?? "",
        likes: blog.likes ?? 0,
        descriptionDetails: blog.descriptionDetails ?? "",
      }}
    />
  );
}

