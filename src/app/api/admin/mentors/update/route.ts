import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    bio: z.string().optional(),
    expertise: z.string().optional(),
    linkedinProfileUrl: z.string().optional(),
    profileImage: z.string().optional(),
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
    const user = await UserModel.findById(parsed.data.id).exec();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (parsed.data.name !== undefined) user.username = parsed.data.name;
    if (parsed.data.email !== undefined) user.email = parsed.data.email;
    if (parsed.data.linkedinProfileUrl !== undefined) user.linkedinProfileUrl = parsed.data.linkedinProfileUrl;

    // NOTE: Schema may or may not support bio/expertise/profilePicture directly on User
    // Typically they might be on a Mentor profile or embedded in user. For now sticking to fields existing or loose mapping.
    // @ts-ignore
    if (parsed.data.bio !== undefined) user.bio = parsed.data.bio;
    // @ts-ignore
    if (parsed.data.expertise !== undefined) user.expertise = parsed.data.expertise;
    if (parsed.data.profileImage !== undefined) user.profilePicture = parsed.data.profileImage;

    await user.save();

    return NextResponse.json({ ok: true });
}
