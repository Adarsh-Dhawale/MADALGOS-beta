"use client";

import React, { useState } from "react";
import { BlogEditor, BlogFormData } from "@/components/admin/forms/BlogEditor";
import { PageHeader } from "@/components/admin/PageHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditBlogPageClient({ id, initialData }: { id: number, initialData: BlogFormData }) {
    const router = useRouter();
    const [isBusy, setIsBusy] = useState(false);

    const handleSubmit = async (data: BlogFormData, action: "DRAFT" | "PENDING_REVIEW") => {
        setIsBusy(true);
        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, status: action }),
            });
            if (!res.ok) throw new Error("Failed to update blog");

            toast.success(action === "DRAFT" ? "Draft saved" : "Submitted for review");
            router.push("/admin/blogs");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update blog");
            setIsBusy(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Blog"
                description="Update the blog content, SEO, and status. Save as draft or publish it."
                backHref="/admin/blogs"
                backLabel="Blogs"
            />
            <BlogEditor initialData={initialData} onSubmit={handleSubmit} isBusy={isBusy} primaryActionLabel="Publish blog" />
        </div>
    );
}
