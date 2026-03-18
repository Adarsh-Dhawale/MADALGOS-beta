"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, LogOut } from "lucide-react";

export default function MentorTopBar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-12 xl:px-14 py-3 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="px-2 text-slate-300 hover:text-white hover:bg-white/5"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em]">Back</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5 transition-colors"
            onClick={() => router.push("/")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit main site
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:text-white transition-colors"
            onClick={async () => {
              try {
                await fetch("/api/auth/logout", { method: "POST" });
              } catch {
                // ignore
              } finally {
                router.push("/auth");
              }
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

