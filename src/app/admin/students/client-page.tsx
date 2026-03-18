"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type StudentRow = {
    id: string;
    email: string;
    username: string | null;
    status: string;
    createdAt: string;
};

export default function StudentsPageClient({
    initialStudents,
}: {
    initialStudents: StudentRow[];
}) {
    const [students] = useState(initialStudents);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const filteredStudents = students.filter((s) => {
        const term = search.toLowerCase();
        const matchesSearch = (s.username?.toLowerCase().includes(term) ?? false) ||
            (s.email.toLowerCase().includes(term));
        const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getActions = (student: StudentRow) => {
        const actions = [];

        // Read-heavy page, mostly for viewing profile
        actions.push({
            label: "View Profile",
            onClick: () => { window.alert(`Navigating to profile for ${student.email}`); }
        });

        if (student.status !== "SUSPENDED") {
            actions.push({
                label: "Suspend Account",
                onClick: () => { window.alert(`Suspend functionality to be implemented. Target: ${student.email}`); },
                destructive: true
            });
        }

        return actions;
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Student Directory"
                description="View all registered student accounts on the MADAlgos platform."
                badge={`${students.length} Total Students`}
                backHref="/admin"
                backLabel="Dashboard"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 rounded-full bg-[#050505]/80 border-white/10 text-white focus-visible:ring-primary focus-visible:ring-offset-0"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex h-10 w-full sm:w-[180px] rounded-full border border-white/10 bg-[#050505]/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                >
                    <option value="ALL">All Statuses</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">New (Pending)</option>
                    <option value="SUSPENDED">Suspended</option>
                </select>
            </div>

            <DataTable
                headers={["Student", "Email", "Joined Date", "Status", "Actions"]}
                rows={filteredStudents.map(s => [
                    <span key="n" className="font-medium text-white">{s.username || "No Name"}</span>
                    ,
                    <span key="e" className="text-slate-300 truncate">{s.email}</span>,
                    <span key="d" className="text-slate-400">{new Date(s.createdAt).toLocaleDateString()}</span>,
                    <StatusBadge key="s" label={s.status} tone={s.status === "ACTIVE" ? "success" : s.status === "SUSPENDED" ? "danger" : "warning"} />,
                    <ActionMenu key="x" actions={getActions(s)} />
                ])}
                emptyMessage={<div className="flex flex-col items-center justify-center space-y-3 py-10 text-slate-400">
                    <Search className="h-8 w-8 opacity-20" />
                    <p>No students found matching your filters.</p>
                </div> as any}
            />
        </div>
    );
}
