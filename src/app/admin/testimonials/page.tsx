import React from "react";
import TestimonialsPageClient from "./client-page";
import { connectDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import type { TestimonialDocument } from "@/models/Testimonial";
import { getSessionFromRequestCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LEGACY_TESTIMONIALS } from "@/lib/legacy-testimonials";

export const metadata = {
    title: "Admin | Testimonials",
};

export default async function AdminTestimonialsPage() {
    const session = await getSessionFromRequestCookies();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
        redirect("/auth");
    }

    await connectDB();

    const testimonialsRaw = await TestimonialModel.find().sort({ createdAt: -1 }).lean<TestimonialDocument[]>().exec();

    const mappedTestimonials = testimonialsRaw.map((t: any) => ({
        id: String(t._id),
        name: t.name,
        role: t.role,
        status: t.status,
        createdAt: t.createdAt?.toISOString() || new Date().toISOString(),
    }));

    const legacy = LEGACY_TESTIMONIALS.map((t, idx) => ({
        id: `legacy-${idx}`,
        name: t.name,
        role: t.role,
        status: "LEGACY",
        createdAt: new Date(0).toISOString(),
    }));

    return <TestimonialsPageClient initialTestimonials={mappedTestimonials} legacyTestimonials={legacy} />;
}
