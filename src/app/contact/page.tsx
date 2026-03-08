"use client";

import React, { FormEvent, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" className="text-[#25D366]">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import ReCaptchaComponent from "@/components/Auth/ReCaptcha";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const WHATSAPP_BASE = "https://api.whatsapp.com/send";
const phone1 = "919599204039";
const phone2 = "917032257346";

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [emailTouched, setEmailTouched] = useState(false);
  const contactDigitsRef = useRef<HTMLInputElement>(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = (value: string) => {
    if (!value.trim()) return "";
    return EMAIL_REGEX.test(value.trim()) ? "" : "Please enter a valid email address.";
  };

  // Scroll contact form into view when page loads so it's visible without manual scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    const formData = new FormData(form);
    const email = (formData.get("email") as string) ?? "";
    if (validateEmail(email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }
    const digits = (formData.get("contact_digits") as string)?.replace(/\D/g, "") ?? "";
    const phone = digits ? `+91${digits}` : "";
    const payload = {
      name: formData.get("name") as string,
      email: email.trim(),
      phone: phone || undefined,
      message: formData.get("message") as string,
      organization: (formData.get("organization") as string) || undefined,
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
      form.reset();
      if (contactDigitsRef.current) contactDigitsRef.current.value = "";
      setToken(null);
      setVerified(false);
      setSuccessDialogOpen(true);
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
                You can email us at{" "}
                <a href="mailto:contact@MADAlgos.in" className="font-semibold text-card-foreground hover:text-primary">contact@MADAlgos.in</a>
                {" "}or{" "}
                <a href="mailto:team@MADAlgos.in" className="font-semibold text-card-foreground hover:text-primary">team@MADAlgos.in</a>
                , or use the form alongside to schedule a call or request a custom proposal.
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
                    <p className="mt-1 text-sm text-card-foreground">
                      <a href="tel:+919599204039" className="hover:text-primary">+91-9599204039</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-muted px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15">
                    <WhatsAppIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      WhatsApp
                    </p>
                    <p className="mt-1 text-sm text-card-foreground">
                      <a href={`${WHATSAPP_BASE}/?phone=${phone1}&text=&type=phone_number&app_absent=0`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-medium">+91-9599204039</a>
                    </p>
                    <p className="mt-1 text-sm text-card-foreground">
                      <a href={`${WHATSAPP_BASE}/?phone=${phone2}&text=&type=phone_number&app_absent=0`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-medium">+91-7032257346</a>
                    </p>
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
                    <p className="mt-1 text-sm text-card-foreground">
                      <a href="mailto:contact@MADAlgos.in" className="hover:text-primary">contact@MADAlgos.in</a>
                      <br />
                      <a href="mailto:team@MADAlgos.in" className="hover:text-primary">team@MADAlgos.in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: contact form */}
            <div id="contact-form" className="relative px-8 py-10 md:px-10 scroll-mt-32">
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
                        className={`h-11 w-full rounded-full border bg-[#1c1c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2ab5a0]/60 transition ${
                          emailError ? "border-red-400/60" : "border-white/10 focus:border-[#2ab5a0]"
                        }`}
                        onBlur={(e) => {
                          setEmailTouched(true);
                          setEmailError(validateEmail(e.target.value));
                        }}
                        onChange={(e) => {
                          if (emailTouched) setEmailError(validateEmail(e.target.value));
                        }}
                      />
                      {emailError && (
                        <p className="text-xs text-red-400">{emailError}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Contact
                    </label>
                    <div className="flex h-11 w-full rounded-full border border-white/10 bg-[#1c1c1c] overflow-hidden focus-within:border-[#2ab5a0] focus-within:ring-2 focus-within:ring-[#2ab5a0]/60 transition">
                      <span className="flex items-center pl-4 text-sm text-slate-400 shrink-0">+91</span>
                      <input
                        ref={contactDigitsRef}
                        type="tel"
                        name="contact_digits"
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      College / University / Organization <span className="text-slate-600 normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      placeholder="e.g. IIT Delhi, Acme Corp"
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
                  {submitting ? "Sending message..." : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="pt-2 text-xs md:text-sm text-red-400">
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

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="bg-slate-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">Thank you</DialogTitle>
          </DialogHeader>
          <p className="text-slate-200">
            We have received your email and we will reach out to you within 48 hrs.
          </p>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setSuccessDialogOpen(false)}
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-slate-950 hover:brightness-110"
            >
              OK
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactPage;

