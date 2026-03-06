"use client";

import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import ReCaptchaComponent from "@/components/Auth/ReCaptcha";

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save form ref immediately — e.currentTarget becomes null after any await
    const form = e.currentTarget;
    setSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("contact") as string,
      message: formData.get("message") as string,
      token,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (!res.ok) {
        setStatus("error");
        setStatusMessage(
          data?.error || "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        data?.message || "Message sent successfully. We'll get back to you shortly."
      );
      form.reset();
      setToken(null);
      setVerified(false);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />
      <main className="pt-28 md:pt-32 pb-24">
        <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-8">
          {/* Floating background shapes */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/25" />
            <div className="absolute bottom-12 -left-28 h-64 w-64 rounded-full border-[18px] border-secondary/70 opacity-70" />
            <div
              className="absolute top-1/3 right-[8%] opacity-15"
              style={{
                width: 0,
                height: 0,
                borderLeft: "90px solid transparent",
                borderRight: "90px solid transparent",
                borderBottom: "156px solid #2ab5a0",
              }}
            />
            <div className="absolute top-1/2 -left-10 h-14 w-60 rounded-md bg-primary/20" />
            <div className="absolute top-32 left-1/4 h-16 w-16 rounded-full bg-[#c9973a]/40" />
          </div>

          {/* Top heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-[2px] w-9 rounded-full bg-primary" />
              Contact Us
            </span>
            <h1 className="mt-5 text-3xl md:text-4xl lg:text-[2.8rem] font-extrabold leading-tight text-gradient-premium">
              Let&apos;s build something exceptional.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
              Whether you&apos;re exploring MAD Algos for enterprise training, hiring elite
              engineers, or planning a custom program, our team will get back to you within one
              business day.
            </p>
          </motion.div>

          {/* Main white card (two columns) */}
            <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative grid gap-0 rounded-[2.75rem] bg-card text-card-foreground shadow-[0_40px_120px_rgba(0,0,0,0.75)] lg:grid-cols-2"
          >
            {/* Uneven card edges */}
            <div className="pointer-events-none absolute inset-y-8 -left-10 w-10 rounded-[999px] bg-card shadow-[24px_0_40px_rgba(15,23,42,0.32)]" />
            <div className="pointer-events-none absolute inset-y-8 -right-10 w-10 rounded-[999px] bg-card shadow-[-24px_0_40px_rgba(15,23,42,0.32)]" />

            {/* Left column */}
            <div className="relative border-b border-border px-8 py-10 md:px-10 lg:border-b-0 lg:border-r">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                Get in touch
              </p>
              <h2 className="mb-4 text-3xl font-semibold text-card-foreground">
                Talk to the MAD Algos team
              </h2>
              <p className="mb-8 text-sm text-muted-foreground leading-relaxed max-w-md">
                You can email us directly at{" "}
                <span className="font-semibold text-card-foreground">contact@MADAlgos.in</span> or use the
                form alongside to schedule a call or request a custom proposal.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-2xl bg-muted px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Our Address
                    </p>
                    <p className="mt-1 text-sm text-card-foreground leading-relaxed">
                      MAD Algos, 7th Floor Ramky One Galaxia,
                      <br />
                      Nallagandla, Hyderabad 500019,
                      <br />
                      Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-muted px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Phone
                    </p>
                    <p className="mt-1 text-sm text-card-foreground">+91 203 302 9545</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-muted px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-card-foreground">contact@MADAlgos.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: contact form */}
            <div className="relative px-8 py-10 md:px-10">
              {/* soft gradient bar at top of form panel */}
              <div className="pointer-events-none absolute left-8 right-8 top-4 h-10 rounded-[1.5rem] bg-gradient-to-r from-[#2ab5a0] via-[#27c2ae] to-[#0ea5e9] opacity-80 blur-[10px]" />

              <div className="relative rounded-[2rem] bg-[#111111]/96 px-6 pt-10 pb-7 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
                <h3 className="mb-2 text-lg font-semibold text-white">Contact Form</h3>
                <p className="mb-6 text-xs md:text-sm text-slate-400">
                  Enter your details and we&apos;ll respond promptly.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="h-11 w-full rounded-full border border-white/10 bg-[#1c1c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#2ab5a0] focus:outline-none focus:ring-2 focus:ring-[#2ab5a0]/60 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-full border border-white/10 bg-[#1c1c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#2ab5a0] focus:outline-none focus:ring-2 focus:ring-[#2ab5a0]/60 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Contact
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="+91"
                      className="h-11 w-full rounded-full border border-white/10 bg-[#1c1c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#2ab5a0] focus:outline-none focus:ring-2 focus:ring-[#2ab5a0]/60 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="Tell us a bit about what you’re looking for..."
                      className="w-full rounded-2xl border border-white/10 bg-[#1c1c1c] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#2ab5a0] focus:outline-none focus:ring-2 focus:ring-[#2ab5a0]/60 transition resize-none"
                    />
                  </div>

                <ReCaptchaComponent setVerified={setVerified} setToken={setToken} />

                <button
                  type="submit"
                  disabled={submitting || !verified}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2ab5a0] to-[#136b60] px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_36px_rgba(42,181,160,0.55)] hover:brightness-110 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </button>

                {status !== "idle" && (
                  <p
                    className={[
                      "pt-2 text-xs md:text-sm",
                      status === "success" ? "text-emerald-400" : "text-red-400",
                    ].join(" ")}
                  >
                    {statusMessage}
                  </p>
                )}
                </form>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

