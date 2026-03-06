"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Building2, ArrowUpRight, Globe, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const hubs = [
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=500&auto=format&fit=crop",
    collaboration: "SILICON VALLEY INNOVATION HUB",
    location: "Palo Alto, California",
    tag: "DEEP TECH CORE",
    icon: <Globe className="w-5 h-5" />,
    stats: "2.4k+ Engineers"
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=500&auto=format&fit=crop",
    collaboration: "MAD ALGOS BENGALURU CAMPUS",
    location: "Bengaluru, Karnataka",
    tag: "ENGINEERING EXCELLENCE",
    icon: <Layers className="w-5 h-5" />,
    stats: "1.8k+ Talent Grid"
  },
  {
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=800&h=500&auto=format&fit=crop",
    collaboration: "LONDON TECH CORE",
    location: "London, UK",
    tag: "GLOBAL STRATEGY",
    icon: <ShieldCheck className="w-5 h-5" />,
    stats: "Launch Q3 2026",
    isComingSoon: true,
  },
];

const CampusSection = () => {
  return (
    <section className="bg-background py-16 md:py-32 relative overflow-hidden border-t border-white/5">
      {/* Dynamic background accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(20,184,166,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-2xl ring-1 ring-white/5"
          >
            <Building2 className="w-4 h-4" />
            <span>Campuses</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter uppercase leading-tight"
          >
            India&apos;s Next‑Gen <span className="text-gradient-brand">Campuses</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight opacity-70"
          >
            uGSOT is collaborating with cutting‑edge university campuses across India, giving students world‑class learning spaces right where innovation thrives.
          </motion.p>
        </div>

        {/* Horizontal auto-scrolling campuses carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/60 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/60 to-transparent z-20" />

          <div className="overflow-hidden">
            <div className="flex gap-8 md:gap-10 animate-marquee">
              {[...hubs, ...hubs].map((hub, index) => (
                <motion.div
                  key={`${hub.collaboration}-${index}`}
                  className="group relative flex flex-col bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all duration-700 hover:scale-[1.02] hover:border-primary/40 h-full ring-1 ring-white/5 min-w-[280px] sm:min-w-[340px] lg:min-w-[380px]"
                  whileHover={{ y: -6 }}
                >
                  {/* Premium Top Line Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform origin-left group-hover:scale-x-110 transition-transform duration-1000 z-20 opacity-40 group-hover:opacity-100" />

                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={hub.image || ''}
                      alt={hub.collaboration}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Hub Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 text-[9px] font-black text-primary tracking-[0.3em] uppercase z-10">
                      {hub.tag}
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-6 md:mb-8 text-muted-foreground">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                        {hub.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">
                          Enterprise Hub
                        </span>
                        <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                          {hub.location}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-6 md:mb-8 group-hover:text-primary transition-colors">
                      {hub.collaboration}
                    </h3>

                    <div className="mt-auto space-y-5">
                      <div className="flex items-center justify-between py-3 border-y border-white/5">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                          Protocol Capacity
                        </span>
                        <span className="text-[12px] font-bold text-white uppercase">
                          {hub.stats}
                        </span>
                      </div>

                      <button
                        disabled={hub.isComingSoon}
                        className={`group/btn w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl transition-all duration-300 transform active:scale-95 shadow-2xl flex items-center justify-center gap-3 ${
                          hub.isComingSoon
                            ? 'bg-white/5 text-muted-foreground border border-white/5 cursor-not-allowed opacity-40'
                            : 'bg-primary text-primary-foreground hover:brightness-110 shadow-primary/10'
                        }`}
                      >
                        {hub.isComingSoon ? 'COMMISSIONING...' : 'EXPLORE PROTOCOL'}
                        {!hub.isComingSoon && (
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusSection;
