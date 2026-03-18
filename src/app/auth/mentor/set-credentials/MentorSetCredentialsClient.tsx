"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function MentorSetCredentialsClient() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") ?? "";
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/mentor/set-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error || "Failed to set password");
      router.push("/mentor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />
      <main className="pt-28 md:pt-32 pb-20 px-4 md:px-6">
        <section className="max-w-xl mx-auto">
          <div className="rounded-4xl bg-[#111111]/95 border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.7)] p-6 md:p-8">
            <h1 className="text-2xl font-bold text-white">Set your mentor password</h1>
            <p className="mt-2 text-sm text-slate-400">
              This link is sent after Admin/Super Admin approves your mentor application.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  New password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    minLength={6}
                    placeholder="Enter a strong password"
                    className="h-10 pl-9 rounded-full border-white/10 bg-[#1c1c1c] text-sm text-white placeholder:text-slate-500 focus:border-[#2ab5a0] focus:ring-2 focus:ring-[#2ab5a0]/60"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <Button
                type="submit"
                disabled={loading || !token}
                className="w-full justify-center rounded-full bg-linear-to-r from-[#2ab5a0] to-[#136b60] text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_36px_rgba(42,181,160,0.55)] hover:brightness-110 active:scale-95 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Set password"}
              </Button>
            </form>

            {!token && (
              <p className="mt-4 text-xs text-amber-300">
                Missing token. Please open the link from your approval email.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

