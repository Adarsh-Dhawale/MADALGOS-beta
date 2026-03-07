"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Calendar, Box, BookOpen, Info, Mail, Briefcase, Search, Bell, Sparkles, Globe, BarChart3, ShieldCheck, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_ITEMS = [
  { 
    name: "ENTERPRISE HUBS", 
    href: "#", 
    dropdown: [
      { name: "Silicon Valley Hub", href: "#", description: "Deep-tech innovation center", icon: <Globe className="w-4 h-4" /> },
      { name: "Bengaluru Campus", href: "#", description: "B2B engineering excellence", icon: <Box className="w-4 h-4" /> },
      { name: "Singapore Lab", href: "#", description: "Global strategy & fintech", icon: <ShieldCheck className="w-4 h-4" /> },
    ]
  },
  { 
    name: "AI FOUNDRY", 
    href: "#", 
    dropdown: [
      { name: "LLM Orchestration", href: "#", description: "Enterprise-grade models", icon: <Sparkles className="w-4 h-4" /> },
      { name: "Agentic Systems", href: "#", description: "Autonomous workflows", icon: <Box className="w-4 h-4" /> },
      { name: "MLOps Protocol", href: "#", description: "Production scaling", icon: <BarChart3 className="w-4 h-4" /> },
    ]
  },
  { 
    name: "INSIGHTS", 
    href: "#", 
    dropdown: [
      { name: "Whitepapers", href: "#", description: "Industry deep dives", icon: <BookOpen className="w-4 h-4" /> },
      { name: "B2B Benchmarks", href: "#", description: "Performance data", icon: <BarChart3 className="w-4 h-4" /> },
    ]
  },
  { name: "BLOGS", href: "/blogs", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { name: "CONTACT US", href: "/contact", icon: <Mail className="w-3.5 h-3.5" /> },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("madalgos-theme") as "light" | "dark" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initial);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(initial);
  }, []);

  // When mobile menu is open: lock body scroll so only menu content scrolls
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const next: "light" | "dark" = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(next);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(next);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("madalgos-theme", next);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] px-4 py-3 md:px-8",
      isScrolled ? "translate-y-0" : "translate-y-2"
    )}>
      <nav
        className={cn(
          "mx-auto max-w-[1440px] transition-all duration-700 rounded-[2.5rem] border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
          isScrolled 
            ? "bg-slate-950/80 backdrop-blur-3xl border-white/10 py-3 ring-1 ring-white/5" 
            : "bg-white/[0.03] backdrop-blur-xl border-white/5 py-5"
        )}
      >
        <div className="px-3 sm:px-6 md:px-10 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo Section */}
          <div className="flex items-center gap-4 md:gap-12 min-w-0 flex-shrink">
            <a href="/" className="flex items-center gap-2 sm:gap-4 group transition-all active:scale-95 shrink-0" aria-label="home">
              <div className="relative w-24 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12">
                <Image
                  src="/navbar_logo2_trans.png"
                  alt="MAD ALGOS"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-12">
            <ul className="flex items-center gap-10 text-[11px] md:text-[12px] font-black tracking-[0.24em] text-muted-foreground/80 whitespace-nowrap">
                {NAV_ITEMS.map((item) => (
                  <li 
                    key={item.name} 
                    className="relative group/item py-2"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-3 hover:text-white transition-all duration-300 group-hover/item:text-primary"
                    >
                      {item.icon && (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary/40">
                          {item.icon}
                        </span>
                      )}
                      <span className="py-1.5 px-0.5">
                        {item.name}
                      </span>
                      {item.dropdown && (
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-transform duration-500 ease-out",
                          activeDropdown === item.name ? "rotate-180 text-primary" : "opacity-40"
                        )} />
                      )}
                    </a>
                    
                    {item.dropdown && (
                      <div className={cn(
                        "absolute left-[-40px] top-full pt-8 transition-all duration-500 transform",
                        activeDropdown === item.name 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible translate-y-4 pointer-events-none"
                      )}>
                        <div className="w-[340px] rounded-[2.5rem] bg-slate-950/95 backdrop-blur-3xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden p-4 ring-1 ring-white/5">
                          <div className="grid grid-cols-1 gap-2">
                            {item.dropdown.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="group/sub flex items-start gap-5 p-5 rounded-3xl hover:bg-white/5 transition-all duration-300"
                              >
                                <div className="mt-0.5 w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover/sub:bg-primary/10 group-hover/sub:text-primary transition-all duration-300 border border-white/5 group-hover:border-primary/20">
                                  {subItem.icon}
                                </div>
                                <div className="space-y-1.5">
                                  <p className="text-[14px] font-black text-white group-hover/sub:text-primary transition-colors uppercase tracking-tight">{subItem.name}</p>
                                  <p className="text-[11px] font-medium text-muted-foreground group-hover/sub:text-gray-300 transition-colors leading-relaxed line-clamp-1">{subItem.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="mt-3 p-4 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all">
                             <a href="#" className="flex items-center justify-between px-2 group/btn">
                               <span className="text-[11px] font-black text-primary tracking-[0.4em] uppercase">Enterprise Access</span>
                               <Sparkles className="w-4 h-4 text-primary group-hover/btn:rotate-12 transition-transform" />
                             </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center whitespace-nowrap overflow-hidden rounded-full p-px transition-all active:scale-95 shadow-2xl shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />
              <div className="relative inline-flex items-center justify-center whitespace-nowrap bg-primary-foreground/90 font-black h-10 sm:h-12 px-4 sm:px-8 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] text-white group-hover:text-primary group-hover:bg-transparent transition-all duration-300 uppercase">
                Join Us
              </div>
            </a>

            <a
              href="#"
              className="hidden md:inline-flex group relative items-center justify-center whitespace-nowrap overflow-hidden rounded-full p-px transition-all active:scale-95 shadow-2xl shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />
              <div className="relative inline-flex items-center justify-center whitespace-nowrap bg-primary-foreground/90 font-black h-12 px-8 rounded-full text-[11px] tracking-[0.3em] text-white group-hover:text-primary group-hover:bg-transparent transition-all duration-300 uppercase">
                Log In
              </div>
            </a>

            {/* Theme toggle - extreme right */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden lg:inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-all active:scale-95 ml-1"
              aria-label="Toggle light/dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex-shrink-0 p-3 sm:p-4 text-white bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 hover:bg-white/10 transition-all active:scale-95"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="size-5 sm:size-6" /> : <Menu className="size-5 sm:size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu: full-viewport overlay so only menu scrolls, not page behind */}
        <div className={cn(
          "xl:hidden fixed inset-0 top-0 z-[99] pt-24 pb-6 px-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10"
            aria-label="Close menu"
          />
          <div className="relative max-h-[calc(100vh-120px)] overflow-y-auto rounded-[2rem] bg-slate-950/98 backdrop-blur-3xl border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)] p-8 sm:p-10">
          <div className="space-y-10">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="space-y-6">
                <button className="flex items-center justify-between w-full text-white font-black text-lg tracking-[0.2em] group uppercase">
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-6 h-6 opacity-40 group-hover:text-primary transition-all" />}
                </button>
                {item.dropdown && (
                  <div className="grid grid-cols-1 gap-4 pl-6 border-l-2 border-white/5">
                    {item.dropdown.map((sub) => (
                      <a key={sub.name} href={sub.href} className="text-[14px] font-black text-muted-foreground hover:text-primary transition-colors py-1.5 uppercase tracking-widest">
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 pt-10 border-t border-white/10 flex flex-col gap-5">
            <a
              href="#"
              className="w-full inline-flex items-center justify-center font-black h-16 rounded-[2rem] bg-primary text-slate-950 text-[13px] tracking-[0.3em] shadow-2xl shadow-primary/20 uppercase"
            >
              Access Portal
            </a>
            <a
              href="#"
              className="w-full inline-flex items-center justify-center font-black h-16 rounded-[2rem] bg-white/5 text-white border border-white/10 text-[13px] tracking-[0.3em] uppercase"
            >
              Contact Support
            </a>
          </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
