"use client";

import React from 'react';
import { ChevronRight, Globe, Shield, Zap, ArrowRight, Play, Server, Database, Lock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-background relative min-h-screen flex flex-col overflow-hidden">
      {/* Background: Unsplash (open-source) — no third-party video */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30 brightness-[0.6] scale-105"
          priority
          sizes="100vw"
        />
        
        {/* Advanced Overlays for Premium Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(45,212,191,0.08)_0%,transparent_70%)]" />
        
        {/* Animated Background Gradients - Premium Aura */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center pt-24 md:pt-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
              <div className="lg:col-span-8">
                {/* Premium Tagline Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-4 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl text-primary text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase mb-8 md:mb-10 shadow-2xl ring-1 ring-white/5"
                >
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </div>
                  <span>INDUSTRY-ALIGNED TECH EDUCATION PLATFORM</span>
                </motion.div>

                {/* Headline - Large but Elegant (Plus Jakarta Sans vibe) */}
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-balance text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tighter text-white"
                >
                  India&apos;s Industry-Integrated <br />
                  <span className="text-gradient-brand">Computer</span> <br />
                  <span className="text-gradient-premium">Science Program</span>
                </motion.h1>

                {/* Sub-headline - Premium weight and spacing */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-6 md:mt-8 max-w-2xl text-balance text-base md:text-xl text-muted-foreground font-medium leading-[1.7] tracking-tight opacity-80"
                >
                  A scalable academic transformation model built to enhance institutional reputation,
                  student capability, and long-term industry success.
                </motion.p>

                {/* Action Buttons - upGrad inspired primary + secondary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-10 md:mt-14 flex flex-wrap items-center gap-4 md:gap-6"
                >
                  <a
                    href="/contact#contact-form"
                    className="group relative inline-flex items-center justify-center h-14 md:h-16 px-10 md:px-12 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-primary-foreground transition-all active:scale-95 w-full sm:w-auto overflow-hidden rounded-full shadow-[0_16px_40px_rgba(4,34,102,0.35)] bg-primary"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Apply Now
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  </a>
                  
                  <a
                    href={process.env.NEXT_PUBLIC_BROCHURE_URL ?? "/contact"}
                    target={process.env.NEXT_PUBLIC_BROCHURE_URL ? "_blank" : undefined}
                    rel={process.env.NEXT_PUBLIC_BROCHURE_URL ? "noopener noreferrer" : undefined}
                    className="group relative inline-flex items-center justify-center h-14 md:h-16 px-10 md:px-12 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-white transition-all active:scale-95 w-full sm:w-auto rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 hover:border-white/20 ring-1 ring-white/5"
                  >
                    <Play className="mr-3 h-3 w-3 md:h-4 md:w-4 fill-primary text-primary" />
                    Download Brochure
                  </a>
                </motion.div>
              </div>

            {/* Right Column - Partner Badge Grid (upGrad inspired) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-12 items-end">
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 0.6 }}
                 transition={{ delay: 1 }}
                 className="flex flex-col gap-10 text-right"
               >
                 <p className="text-[10px] font-black tracking-[0.5em] uppercase text-muted-foreground mb-4">Architected with Minds from</p>
                 <div className="space-y-12">
                   {['GOOGLE', 'MICROSOFT', 'NVIDIA', 'META'].map((brand, i) => (
                     <div key={i} className="text-3xl font-black tracking-tighter text-white/40 italic hover:text-white transition-colors cursor-default">
                       {brand}
                     </div>
                   ))}
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Hero bottom spacing without ticker */}
    </section>
  );
};

export default Hero;
