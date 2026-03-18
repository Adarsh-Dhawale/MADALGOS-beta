import React from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionItem {
    label: string;
    onClick: () => void;
    destructive?: boolean;
}

export function ActionMenu({ actions }: { actions: ActionItem[] }) {
    if (!actions.length) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border-white/10 bg-[#111] text-slate-200">
                {actions.map((action, idx) => (
                    <DropdownMenuItem
                        key={idx}
                        onClick={action.onClick}
                        className={action.destructive ? "text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer" : "cursor-pointer"}
                    >
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
