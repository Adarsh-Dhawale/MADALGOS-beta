"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type MentorRow = {
  id: string;
  email: string;
  username: string | null;
  accountStatus: string;
  verificationStatus: string;
  linkedinProfileUrl: string | null;
};

type BlogRow = {
  id: number;
  title: string;
  reviewStatus: string;
};

type TestimonialRow = {
  id: string;
  name: string;
  role: string;
  status: string;
};

export default function AdminQueues({
  initialBlogs,
  initialTestimonials,
}: {
  initialBlogs: BlogRow[];
  initialTestimonials: TestimonialRow[];
}) {
  const [mentors, setMentors] = React.useState<MentorRow[]>([]);
  const [loadingMentors, setLoadingMentors] = React.useState(true);
  const [busyId, setBusyId] = React.useState<string | number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadMentors = React.useCallback(async () => {
    setLoadingMentors(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/mentors?verified=false");
      const data = (await res.json()) as { mentors?: MentorRow[]; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load mentors");
      setMentors(Array.isArray(data.mentors) ? data.mentors : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load mentors");
    } finally {
      setLoadingMentors(false);
    }
  }, []);

  React.useEffect(() => {
    loadMentors();
  }, [loadMentors]);

  const approveMentorApplication = async (id: string) => {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/mentors/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error || "Approve failed");
      await loadMentors();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  const setMentorVerified = async (id: string, verified: boolean) => {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/mentors?id=${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error || "Update failed");
      await loadMentors();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const approveBlog = async (id: number) => {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/blogs/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error || "Approve failed");
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  const approveTestimonial = async (id: string) => {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/testimonials/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error || "Approve failed");
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  const pendingBlogs = initialBlogs.filter((b) => b.reviewStatus !== "APPROVED").slice(0, 8);
  const pendingTestimonials = initialTestimonials.filter((t) => t.status !== "APPROVED").slice(0, 8);
  const pendingMentorApps = mentors.filter((m) => m.accountStatus === "PENDING_APPLICATION");
  const awaitingCreds = mentors.filter((m) => m.accountStatus === "AWAITING_CREDENTIAL_SETUP");

  return (
    <div className="rounded-3xl bg-card/70 border border-white/10 px-5 md:px-6 py-5 md:py-6 shadow-[0_28px_80px_rgba(0,0,0,0.8)]">
      <h2 className="text-base md:text-lg font-semibold text-card-foreground">Review queue</h2>
      <p className="mt-1 text-[11px] md:text-xs text-muted-foreground">
        Quick actions for pending mentor applications, blogs, and testimonials.
      </p>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Mentors (unverified)
          </h3>
          {loadingMentors ? (
            <p className="mt-3 text-xs text-slate-500">Loading...</p>
          ) : (
            <div className="mt-3 space-y-3">
              <div className="text-[11px] text-slate-400">
                Pending applications:{" "}
                <span className="font-semibold text-amber-300">{pendingMentorApps.length}</span>
                {" · "}Awaiting password:{" "}
                <span className="font-semibold text-sky-300">{awaitingCreds.length}</span>
              </div>

              <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {mentors.slice(0, 10).map((m) => (
                  <li key={m.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs text-white font-semibold">
                          {m.username ?? m.email}
                        </p>
                        <p className="truncate text-[11px] text-slate-500">{m.email}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {m.accountStatus === "PENDING_APPLICATION" && (
                          <Button
                            size="sm"
                            disabled={busyId === m.id}
                            className="h-8 rounded-full text-[10px] uppercase tracking-widest"
                            onClick={() => approveMentorApplication(m.id)}
                          >
                            Approve
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={busyId === m.id}
                          className="h-8 rounded-full border-white/15 bg-transparent text-[10px] uppercase tracking-widest text-white hover:bg-white/5"
                          onClick={() => setMentorVerified(m.id, true)}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                    {m.linkedinProfileUrl && (
                      <a
                        href={m.linkedinProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block truncate text-[11px] text-sky-400 hover:underline"
                      >
                        {m.linkedinProfileUrl}
                      </a>
                    )}
                  </li>
                ))}
                {mentors.length === 0 && (
                  <li className="text-xs text-slate-500">No unverified mentors.</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Blogs (pending)
          </h3>
          <ul className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
            {pendingBlogs.map((b) => (
              <li key={b.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="min-w-0 truncate text-xs text-white font-semibold">{b.title}</p>
                  <Button
                    size="sm"
                    disabled={busyId === b.id}
                    className="h-8 rounded-full text-[10px] uppercase tracking-widest"
                    onClick={() => approveBlog(b.id)}
                  >
                    Approve
                  </Button>
                </div>
              </li>
            ))}
            {pendingBlogs.length === 0 && (
              <li className="text-xs text-slate-500">No blogs pending.</li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Testimonials (pending)
          </h3>
          <ul className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
            {pendingTestimonials.map((t) => (
              <li key={t.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs text-white font-semibold">{t.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{t.role}</p>
                  </div>
                  <Button
                    size="sm"
                    disabled={busyId === t.id}
                    className="h-8 rounded-full text-[10px] uppercase tracking-widest"
                    onClick={() => approveTestimonial(t.id)}
                  >
                    Approve
                  </Button>
                </div>
              </li>
            ))}
            {pendingTestimonials.length === 0 && (
              <li className="text-xs text-slate-500">No testimonials pending.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

