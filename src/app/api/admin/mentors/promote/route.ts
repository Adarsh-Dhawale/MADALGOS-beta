import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { getSessionFromRequestCookies } from "@/lib/auth";

const BodySchema = z.object({
    id: z.string().min(1),
    role: z.enum(["ADMIN", "MENTOR"]).optional(), // Default promote to ADMIN, but allow demote
});

export async function POST(req: Request) {
    const session = await getSessionFromRequestCookies();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ONLY SUPER_ADMIN can promote roles
    if (session.role !== "SUPER_ADMIN") {
        return NextResponse.json({ error: "Forbidden: Only Super Admins can manage roles" }, { status: 403 });
    }

    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    await connectDB();
    const user = await UserModel.findById(parsed.data.id).exec();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    user.role = parsed.data.role || "ADMIN";
    await user.save();

    return NextResponse.json({ ok: true });
}
