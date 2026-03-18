import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4 text-slate-400">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-medium animate-pulse tracking-wide">Loading Dashboard...</p>
            </div>
        </div>
    );
}
