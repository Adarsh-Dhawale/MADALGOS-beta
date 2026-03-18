"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type TestimonialFormProps = {
    initialData?: {
        id?: string;
        name?: string;
        company?: string;
        role?: string;
        imageUrl?: string;
        text?: string;
        rating?: number;
    };
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    isBusy: boolean;
};

export function TestimonialForm({ initialData, onSave, onCancel, isBusy }: TestimonialFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        company: initialData?.company || "",
        role: initialData?.role || "",
        imageUrl: initialData?.imageUrl || "",
        text: initialData?.text || "",
        rating: initialData?.rating || 5,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.name === 'rating' ? Number(e.target.value) : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: value }));
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-300">Name</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-300">Company</Label>
                    <Input name="company" value={formData.company} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-300">Role</Label>
                    <Input name="role" value={formData.role} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-300">Rating (1-5)</Label>
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange as any}
                        className="flex h-10 w-full rounded-md border border-white/10 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Image URL</Label>
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Testimonial Text</Label>
                <Textarea name="text" value={formData.text} onChange={handleChange} rows={4} className="bg-[#111] border-white/10 text-white" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button variant="ghost" onClick={onCancel} disabled={isBusy} className="text-slate-400 hover:text-white">Cancel</Button>
                <Button onClick={() => onSave(formData)} disabled={isBusy} className="bg-primary text-black hover:bg-primary/90">Save Testimonial</Button>
            </div>
        </div>
    );
}
