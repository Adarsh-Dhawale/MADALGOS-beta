import React from "react";
import StudentsPageClient from "./client-page";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import type { UserDocument } from "@/models/User";
import { getSessionFromRequestCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Admin | Students",
};

export default async function AdminStudentsPage() {
    const session = await getSessionFromRequestCookies();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
        redirect("/auth");
    }

    await connectDB();

    const studentsRaw = await UserModel.find({ role: "STUDENT" }).sort({ createdAt: -1 }).lean<UserDocument[]>().exec();

    const mappedStudents = studentsRaw.map((s: any) => ({
        id: String(s._id),
        email: s.email,
        username: s.username,
        status: s.status || "ACTIVE", // Fallback for old schema docs
        createdAt: s.createdAt?.toISOString() || new Date().toISOString(),
    }));

    return <StudentsPageClient initialStudents={mappedStudents} />;
}
