import React from "react";
import MentorsPageClient from "./client-page";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import type { UserDocument } from "@/models/User";
import { getSessionFromRequestCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import MentorModel from "@/models/Mentor";
import type { Mentor } from "@/lib/mentors";
import { getMentorDisplayName } from "@/lib/mentors";

export const metadata = {
    title: "Admin | Mentors",
};

export default async function AdminMentorsPage() {
    const session = await getSessionFromRequestCookies();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
        redirect("/auth");
    }

    await connectDB();

    const mentorsRaw = await UserModel.find({
        role: { $in: ["MENTOR", "MENTOR_PENDING", "ADMIN", "SUPER_ADMIN"] },
        accountStatus: { $ne: "SUSPENDED" }
    }).sort({ createdAt: -1 }).lean<UserDocument[]>().exec();

    const mappedMentors = mentorsRaw.map((u: any) => ({
        id: String(u._id),
        email: u.email,
        username: u.username,
        role: u.role,
        accountStatus: u.accountStatus,
        verificationStatus: u.verificationStatus,
    }));

    const legacyMentorsRaw = await MentorModel.find().sort({ joiningDate: -1 }).lean<Mentor[]>().exec();
    const legacyMentors = legacyMentorsRaw.map((m) => ({
        id: String(m.id),
        name: getMentorDisplayName(m),
        linkedin: m.linkedin,
        isVerified: m.isVerified,
        approvalStatus: m.approvalStatus,
        isActive: m.isActive,
    }));

    return (
        <MentorsPageClient
            initialMentors={mappedMentors}
            initialLegacyMentors={legacyMentors}
            currentUserRole={session.role}
        />
    );
}
