"use client";

import React, { useState } from "react";
import { BlogEditor, BlogFormData } from "@/components/admin/forms/BlogEditor";
import { PageHeader } from "@/components/admin/PageHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewBlogPageClient() {
    const router = useRouter();
    const [isBusy, setIsBusy] = useState(false);

    const handleSubmit = async (data: BlogFormData, action: "DRAFT" | "PENDING_REVIEW") => {
        setIsBusy(true);
        try {
            const res = await fetch("/api/admin/blogs/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, status: action }),
            });
            if (!res.ok) throw new Error("Failed to create blog");

            toast.success(action === "DRAFT" ? "Draft saved" : "Submitted for review");
            router.push("/admin/blogs");
            router.refresh();
        } catch (error) {
            toast.error("Failed to save blog");
            setIsBusy(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Blog"
                description="Write a new blog post. Save as draft or publish it."
                backHref="/admin/blogs"
                backLabel="Blogs"
            />
            <BlogEditor onSubmit={handleSubmit} isBusy={isBusy} primaryActionLabel="Publish blog" />
        </div>
    );
}
