"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type MentorProfileFormProps = {
    initialData: {
        userId: string;
        username: string | null;
        email: string;
        headline?: string;
        companies?: string;
        location?: string | null;
        skills?: string[];
        linkedin?: string | null;
        imageUrl?: string | null;
        description?: string;
    };
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    isBusy: boolean;
};

export function MentorProfileForm({ initialData, onSave, onCancel, isBusy }: MentorProfileFormProps) {
    const [formData, setFormData] = useState({
        userId: initialData.userId,
        name: initialData.username || "",
        email: initialData.email || "",
        headline: initialData.headline || "",
        companies: initialData.companies || "",
        location: initialData.location || "",
        skills: (initialData.skills || []).join(" | "),
        linkedin: initialData.linkedin || "",
        imageUrl: initialData.imageUrl || "",
        description: initialData.description || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-300">Name</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-300">Email</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Headline</Label>
                <Input name="headline" value={formData.headline} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Companies (separate with | or ,)</Label>
                <Input name="companies" value={formData.companies} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Location</Label>
                <Input name="location" value={formData.location} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Skills (separate with | or ,)</Label>
                <Input name="skills" value={formData.skills} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">LinkedIn URL</Label>
                <Input name="linkedin" value={formData.linkedin} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Profile Image URL</Label>
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Bio</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button variant="ghost" onClick={onCancel} disabled={isBusy} className="text-slate-400 hover:text-white">Cancel</Button>
                <Button
                    onClick={() =>
                        onSave({
                            userId: formData.userId,
                            name: formData.name,
                            email: formData.email,
                            headline: formData.headline,
                            companies: formData.companies,
                            location: formData.location || null,
                            skills: formData.skills
                                .split(/[,|]/g)
                                .map((s) => s.trim())
                                .filter(Boolean),
                            linkedin: formData.linkedin || null,
                            imageUrl: formData.imageUrl || null,
                            description: formData.description,
                        })
                    }
                    disabled={isBusy}
                    className="bg-primary text-black hover:bg-primary/90"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
