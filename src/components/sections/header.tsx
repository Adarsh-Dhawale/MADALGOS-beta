"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Calendar, Box, BookOpen, Info, Mail, Briefcase, Search, Bell, Sparkles, Globe, BarChart3, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
  { name: "GLOBAL NETWORK", href: "#" },
  { name: "SOLUTIONS", href: "#" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] px-4 py-4 md:px-8",
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
        <div className="px-8 md:px-12 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-16">
            <a href="/" className="flex items-center gap-5 group transition-all active:scale-95" aria-label="home">
              <div className="relative flex items-center justify-center">
                 <div className="absolute inset-[-12px] bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                 <div className="relative flex items-center gap-2.5 p-1 transition-all duration-500 group-hover:scale-110">
                    <div className="w-6 h-6 rounded-full border-2 border-primary shadow-[0_0_20px_rgba(20,184,166,0.6)] flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <div className="w-0 h-0 border-l-[12px] border-l-secondary border-y-[7px] border-y-transparent drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    <div className="w-5 h-5 rounded-sm bg-primary/80 animate-pulse border border-white/20" />
                 </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                  MAD <span className="text-gradient-brand">ALGOS</span>
                </span>
                <span className="text-[8px] tracking-[0.6em] font-black text-muted-foreground uppercase mt-1 opacity-60">Enterprise Elite</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-12">
              <ul className="flex items-center gap-10 text-[11px] font-black tracking-[0.25em] text-muted-foreground/80">
                {NAV_ITEMS.map((item) => (
                  <li 
                    key={item.name} 
                    className="relative group/item py-2"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-2.5 hover:text-white transition-all duration-300 group-hover/item:text-primary"
                    >
                      <span>{item.name}</span>
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
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-2 mr-3">
              <button className="p-3 text-muted-foreground hover:text-white transition-all hover:bg-white/5 rounded-full border border-transparent hover:border-white/10">
                <Search className="w-4.5 h-4.5" />
              </button>
              <button className="p-3 text-muted-foreground hover:text-white transition-all hover:bg-white/5 rounded-full relative border border-transparent hover:border-white/10">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_#14b8a6]" />
              </button>
            </div>
            
            <a
              href="#"
              className="group relative inline-flex items-center justify-center whitespace-nowrap overflow-hidden rounded-full p-px transition-all active:scale-95 shadow-2xl shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />
              <div className="relative inline-flex items-center justify-center whitespace-nowrap bg-slate-950 font-black h-12 px-10 rounded-full text-[11px] tracking-[0.3em] text-white group-hover:bg-transparent transition-all duration-300 uppercase">
                Access Portal
              </div>
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-4 text-white bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all active:scale-95"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "xl:hidden absolute top-full left-0 right-0 mt-6 bg-slate-950/98 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,1)]",
          mobileMenuOpen ? "opacity-100 translate-y-0 max-h-[900px] visible" : "opacity-0 translate-y-12 max-h-0 invisible pointer-events-none"
        )}>
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
      </nav>
    </header>
  );
};

export default Header;
