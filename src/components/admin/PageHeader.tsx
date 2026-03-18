import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({
    title,
    description,
    badge,
    action,
    backHref,
    backLabel = "Back",
}: {
    title: string;
    description: string;
    badge?: string;
    action?: React.ReactNode;
    backHref?: string;
    backLabel?: string;
}) {
    return (
        <div className="mb-6 md:mb-8 space-y-3">
            {backHref && (
                <div>
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="px-2 text-slate-300 hover:text-white hover:bg-white/5"
                    >
                        <Link href={backHref} className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.22em]">{backLabel}</span>
                        </Link>
                    </Button>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="min-w-0">
                {badge && (
                    <p className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                        {badge}
                    </p>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h1>
                <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mt-1.5">{description}</p>
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>
        </div>
    );
}
