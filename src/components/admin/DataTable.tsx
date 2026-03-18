import React from "react";
import { cn } from "@/lib/utils";

interface DataTableProps {
    headers: string[];
    rows: React.ReactNode[][];
    emptyMessage?: string;
}

export function DataTable({ headers, rows, emptyMessage = "No records found." }: DataTableProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-[#050505]/70 w-full overflow-hidden">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[720px] divide-y divide-white/5">
                <div style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
                    className="grid gap-4 px-5 py-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {headers.map((h, i) => (
                        <div key={i} className={cn("truncate", i === headers.length - 1 ? "text-right" : "")}>{h}</div>
                    ))}
                </div>
                <div className="divide-y divide-white/5 text-xs md:text-sm">
                    {rows.length === 0 ? (
                        <div className="px-5 py-8 text-xs text-slate-500 text-center">{emptyMessage}</div>
                    ) : (
                        rows.map((cells, idx) => (
                            <div
                                key={idx}
                                className="grid gap-4 px-5 py-4 text-slate-100 items-center justify-items-start hover:bg-white/5 transition-colors"
                                style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
                            >
                                {cells.map((cell, i) => (
                                    <div key={i} className={cn("truncate flex items-center gap-2 w-full", i === headers.length - 1 ? "justify-end" : "")}>
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}
