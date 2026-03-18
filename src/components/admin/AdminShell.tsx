"use client";

import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Users,
  BookOpen,
  MessageSquareQuote,
  ListChecks,
  LogOut,
} from "lucide-react";

type AdminTab = "queue" | "mentors" | "blogs" | "testimonials";

type MentorRow = {
  id: string;
  email: string;
  username: string | null;
  role: string;
  accountStatus: string;
  verificationStatus: string;
  linkedinProfileUrl: string | null;
  createdAt?: string | Date;
};

type BlogRow = {
  id: number;
  title: string;
  authorName: string;
  reviewStatus: string;
};

type TestimonialRow = {
  id: string;
  name: string;
  role: string;
  status: string;
};

function Badge({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]";
  const tones: Record<typeof tone, string> = {
    default: "bg-white/5 text-slate-200 border border-white/10",
    success: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
    warning: "bg-amber-500/10 text-amber-300 border border-amber-500/40",
    danger: "bg-red-500/10 text-red-300 border border-red-500/40",
  };
  return <span className={`${base} ${tones[tone]}`}>{label}</span>;
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2.5rem] bg-card/70 border border-white/10 px-6 md:px-8 py-6 md:py-8 shadow-[0_28px_80px_rgba(0,0,0,0.8)]">
      <header className="mb-5 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs md:text-sm text-muted-foreground max-w-3xl">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#050505]/70">
      <div className="min-w-full divide-y divide-white/5">
        <div className={cn(
          "grid gap-4 px-5 py-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em] text-slate-400",
          `grid-cols-${headers.length}` // used only for readability; grid template is set inline below
        )} style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
          {headers.map((h) => (
            <div key={h} className="truncate">
              {h}
            </div>
          ))}
        </div>
        <div className="divide-y divide-white/5 text-xs md:text-sm">
          {rows.length === 0 ? (
            <div className="px-5 py-5 text-xs text-slate-500">No records.</div>
          ) : (
            rows.map((cells, idx) => (
              <div
                key={idx}
                className="grid gap-4 px-5 py-4 text-slate-100"
                style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
              >
                {cells.map((cell, i) => (
                  <div key={i} className="truncate flex items-center gap-2">
                    {cell}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminShell({
  mentors,
  blogs,
  testimonials,
}: {
  mentors: MentorRow[];
  blogs: BlogRow[];
  testimonials: TestimonialRow[];
}) {
  const [tab, setTab] = React.useState<AdminTab>("queue");
  const [busyId, setBusyId] = React.useState<string | number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const verifiedMentors = mentors.filter((m) => m.verificationStatus === "VERIFIED");
  const unverifiedMentors = mentors.filter((m) => m.verificationStatus === "UNVERIFIED");
  const pendingBlogs = blogs.filter((b) => b.reviewStatus !== "APPROVED");
  const pendingTestimonials = testimonials.filter((t) => t.status !== "APPROVED");

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/auth";
  };

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
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  const verifyMentor = async (id: string, verified: boolean) => {
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
      window.location.reload();
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

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="inset" collapsible="offcanvas" className="border-white/10">
        <SidebarHeader className="p-3">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">Admin Panel</p>
              <p className="truncate text-[10px] uppercase tracking-[0.22em] text-slate-400">
                MADAlgos Console
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={tab === "queue"} onClick={() => setTab("queue")}>
                <ListChecks />
                <span>Review queue</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={tab === "mentors"} onClick={() => setTab("mentors")}>
                <Users />
                <span>Mentors</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={tab === "blogs"} onClick={() => setTab("blogs")}>
                <BookOpen />
                <span>Blogs</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={tab === "testimonials"}
                onClick={() => setTab("testimonials")}
              >
                <MessageSquareQuote />
                <span>Testimonials</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/5"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/5 bg-background/80 px-4 md:px-8 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-white" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {tab === "queue"
                  ? "Review queue"
                  : tab === "mentors"
                  ? "Mentors"
                  : tab === "blogs"
                  ? "Blogs"
                  : "Testimonials"}
              </p>
              <p className="truncate text-lg md:text-xl font-semibold text-white">
                Manage with confidence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
              onClick={() => (window.location.href = "/")}
            >
              View site
            </Button>
          </div>
        </div>

        <div className="px-4 md:px-8 py-8 md:py-10">
          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10">
            {error && (
              <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {tab === "queue" && (
              <div className="grid gap-6 lg:grid-cols-3">
                <SectionCard
                  title="Mentor applications"
                  description="Approve pending applications to send the password setup email. Verify mentors to make them visible publicly."
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Unverified:{" "}
                      <span className="font-semibold text-amber-300">{unverifiedMentors.length}</span>
                    </span>
                    <span>
                      Verified:{" "}
                      <span className="font-semibold text-emerald-300">{verifiedMentors.length}</span>
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {unverifiedMentors.slice(0, 10).map((m) => (
                      <div
                        key={m.id}
                        className="rounded-3xl border border-white/10 bg-[#050505]/60 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              {m.username ?? m.email}
                            </p>
                            <p className="truncate text-[11px] text-slate-500">{m.email}</p>
                          </div>
                          <Badge
                            label={m.accountStatus}
                            tone={m.accountStatus === "REJECTED" ? "danger" : "warning"}
                          />
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
                        <div className="mt-4 flex flex-wrap gap-2">
                          {m.accountStatus === "PENDING_APPLICATION" ? (
                            <Button
                              size="sm"
                              disabled={busyId === m.id}
                              className="rounded-full text-[10px] uppercase tracking-widest"
                              onClick={() => approveMentorApplication(m.id)}
                            >
                              Approve + Email link
                            </Button>
                          ) : null}
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === m.id}
                            className="rounded-full border-white/15 bg-transparent text-[10px] uppercase tracking-widest text-white hover:bg-white/5"
                            onClick={() => verifyMentor(m.id, true)}
                          >
                            Verify mentor
                          </Button>
                        </div>
                      </div>
                    ))}
                    {unverifiedMentors.length === 0 && (
                      <p className="text-xs text-slate-500">No unverified mentors.</p>
                    )}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Blogs pending review"
                  description="Approve a blog to publish it on the main website."
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Pending:{" "}
                      <span className="font-semibold text-amber-300">{pendingBlogs.length}</span>
                    </span>
                    <span>
                      Total:{" "}
                      <span className="font-semibold text-slate-200">{blogs.length}</span>
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {pendingBlogs.slice(0, 10).map((b) => (
                      <div
                        key={b.id}
                        className="rounded-3xl border border-white/10 bg-[#050505]/60 p-4"
                      >
                        <p className="text-sm font-semibold text-white truncate">{b.title}</p>
                        <p className="mt-1 text-[11px] text-slate-500 truncate">{b.authorName}</p>
                        <div className="mt-4 flex items-center justify-between gap-2">
                          <Badge label={b.reviewStatus} tone="warning" />
                          <Button
                            size="sm"
                            disabled={busyId === b.id}
                            className="rounded-full text-[10px] uppercase tracking-widest"
                            onClick={() => approveBlog(b.id)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                    {pendingBlogs.length === 0 && (
                      <p className="text-xs text-slate-500">No blogs pending.</p>
                    )}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Testimonials pending review"
                  description="Only approved testimonials show on the homepage."
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Pending:{" "}
                      <span className="font-semibold text-amber-300">
                        {pendingTestimonials.length}
                      </span>
                    </span>
                    <span>
                      Total:{" "}
                      <span className="font-semibold text-slate-200">{testimonials.length}</span>
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {pendingTestimonials.slice(0, 10).map((t) => (
                      <div
                        key={t.id}
                        className="rounded-3xl border border-white/10 bg-[#050505]/60 p-4"
                      >
                        <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                        <p className="mt-1 text-[11px] text-slate-500 truncate">{t.role}</p>
                        <div className="mt-4 flex items-center justify-between gap-2">
                          <Badge label={t.status} tone="warning" />
                          <Button
                            size="sm"
                            disabled={busyId === t.id}
                            className="rounded-full text-[10px] uppercase tracking-widest"
                            onClick={() => approveTestimonial(t.id)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                    {pendingTestimonials.length === 0 && (
                      <p className="text-xs text-slate-500">No testimonials pending.</p>
                    )}
                  </div>
                </SectionCard>
              </div>
            )}

            {tab === "mentors" && (
              <SectionCard
                title="Mentors"
                description="Verified mentors are public. Unverified mentors are pending verification or still onboarding."
              >
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Verified mentors</h3>
                      <Badge label={`${verifiedMentors.length} total`} tone="success" />
                    </div>
                    <Table
                      headers={["Mentor", "Email", "Status"]}
                      rows={verifiedMentors.slice(0, 20).map((m) => [
                        <span key="u" className="truncate">
                          {m.username ?? m.email}
                        </span>,
                        <span key="e" className="truncate text-slate-300">
                          {m.email}
                        </span>,
                        <div key="s" className="flex items-center gap-2">
                          <Badge label="Verified" tone="success" />
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === m.id}
                            className="h-8 rounded-full border-white/15 bg-transparent text-[10px] uppercase tracking-widest text-white hover:bg-white/5"
                            onClick={() => verifyMentor(m.id, false)}
                          >
                            Unverify
                          </Button>
                        </div>,
                      ])}
                    />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Unverified mentors</h3>
                      <Badge label={`${unverifiedMentors.length} total`} tone="warning" />
                    </div>
                    <Table
                      headers={["Mentor", "Account", "Actions"]}
                      rows={unverifiedMentors.slice(0, 20).map((m) => [
                        <div key="u" className="min-w-0">
                          <p className="truncate font-semibold">{m.username ?? m.email}</p>
                          {m.linkedinProfileUrl ? (
                            <a
                              className="block truncate text-[11px] text-sky-400 hover:underline"
                              href={m.linkedinProfileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              LinkedIn
                            </a>
                          ) : null}
                        </div>,
                        <Badge key="a" label={m.accountStatus} tone="warning" />,
                        <div key="x" className="flex items-center gap-2">
                          {m.accountStatus === "PENDING_APPLICATION" ? (
                            <Button
                              size="sm"
                              disabled={busyId === m.id}
                              className="h-8 rounded-full text-[10px] uppercase tracking-widest"
                              onClick={() => approveMentorApplication(m.id)}
                            >
                              Approve
                            </Button>
                          ) : null}
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === m.id}
                            className="h-8 rounded-full border-white/15 bg-transparent text-[10px] uppercase tracking-widest text-white hover:bg-white/5"
                            onClick={() => verifyMentor(m.id, true)}
                          >
                            Verify
                          </Button>
                        </div>,
                      ])}
                    />
                  </div>
                </div>
              </SectionCard>
            )}

            {tab === "blogs" && (
              <SectionCard
                title="Blogs"
                description="Only approved blogs are visible publicly. Review status controls publishing."
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Badge label={`${blogs.length} total`} />
                    <Badge label={`${pendingBlogs.length} pending`} tone="warning" />
                  </div>
                </div>
                <Table
                  headers={["Title", "Author", "Status", "Action"]}
                  rows={blogs.slice(0, 30).map((b) => [
                    <span key="t" className="truncate" title={b.title}>
                      {b.title}
                    </span>,
                    <span key="a" className="truncate text-slate-300">
                      {b.authorName}
                    </span>,
                    <Badge
                      key="s"
                      label={b.reviewStatus}
                      tone={
                        b.reviewStatus === "APPROVED"
                          ? "success"
                          : b.reviewStatus === "REJECTED"
                          ? "danger"
                          : "warning"
                      }
                    />,
                    <div key="x">
                      {b.reviewStatus !== "APPROVED" ? (
                        <Button
                          size="sm"
                          disabled={busyId === b.id}
                          className="h-8 rounded-full text-[10px] uppercase tracking-widest"
                          onClick={() => approveBlog(b.id)}
                        >
                          Approve
                        </Button>
                      ) : (
                        <span className="text-[11px] text-slate-500">—</span>
                      )}
                    </div>,
                  ])}
                />
              </SectionCard>
            )}

            {tab === "testimonials" && (
              <SectionCard
                title="Testimonials"
                description="Only approved testimonials show on the homepage."
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Badge label={`${testimonials.length} total`} />
                    <Badge label={`${pendingTestimonials.length} pending`} tone="warning" />
                  </div>
                </div>
                <Table
                  headers={["Name", "Role", "Status", "Action"]}
                  rows={testimonials.slice(0, 30).map((t) => [
                    <span key="n" className="truncate" title={t.name}>
                      {t.name}
                    </span>,
                    <span key="r" className="truncate text-slate-300" title={t.role}>
                      {t.role}
                    </span>,
                    <Badge
                      key="s"
                      label={t.status}
                      tone={
                        t.status === "APPROVED"
                          ? "success"
                          : t.status === "REJECTED"
                          ? "danger"
                          : "warning"
                      }
                    />,
                    <div key="x">
                      {t.status !== "APPROVED" ? (
                        <Button
                          size="sm"
                          disabled={busyId === t.id}
                          className="h-8 rounded-full text-[10px] uppercase tracking-widest"
                          onClick={() => approveTestimonial(t.id)}
                        >
                          Approve
                        </Button>
                      ) : (
                        <span className="text-[11px] text-slate-500">—</span>
                      )}
                    </div>,
                  ])}
                />
              </SectionCard>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

