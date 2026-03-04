"use client";

import React from 'react';
import { ChevronRight, Globe, Shield, Zap, ArrowRight, Play, Server, Database, Lock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-background relative min-h-screen flex flex-col overflow-hidden">
      {/* Premium Video Background Layer */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30 brightness-[0.6] scale-105"
        >
          {/* Using a high-quality tech video placeholder - similar to upGrad's holographic table style */}
          <source src="https://video.twimg.com/tweet_video/Ff_S-S8X0AAs5yL.mp4" type="video/mp4" />
          <source src="https://video.twimg.com/tweet_video/E0y8vVdXMAA6g0N.mp4" type="video/mp4" />
          <source src="https://video.twimg.com/tweet_video/FAvNqHXXEAs7eJ6.mp4" type="video/mp4" />
          {/* Fallback to high-quality Unsplash image if video fails to load or is slow */}
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            className="h-full w-full object-cover opacity-20" 
            alt="Enterprise Tech"
          />
        </video>
        
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
                  className="inline-flex items-center gap-4 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl text-primary text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase mb-8 md:mb-12 shadow-2xl ring-1 ring-white/5"
                >
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </div>
                  <span>Protocol: Enterprise AI Transformation</span>
                </motion.div>

                {/* Headline - Large but Elegant (Plus Jakarta Sans vibe) */}
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-balance text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold leading-[0.85] tracking-tighter text-white"
                >
                  Intelligent <br />
                  <span className="text-gradient-brand">Enterprise</span> <br />
                  <span className="text-gradient-premium">Intelligence</span>
                </motion.h1>

                {/* Sub-headline - Premium weight and spacing */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-8 md:mt-12 max-w-2xl text-balance text-lg md:text-2xl text-muted-foreground font-medium leading-[1.6] tracking-tight opacity-70"
                >
                  MAD Algos architects proprietary talent grids and AI infrastructure for global industry leaders at the intersection of deep-tech and scale.
                </motion.p>

                {/* Action Buttons - upGrad inspired primary + secondary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-12 md:mt-16 flex flex-wrap items-center gap-4 md:gap-6"
                >
                  <button
                    className="group relative inline-flex items-center justify-center h-16 md:h-20 px-10 md:px-14 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-primary-foreground transition-all active:scale-95 w-full sm:w-auto overflow-hidden rounded-full shadow-[0_20px_60px_rgba(45,212,191,0.25)] bg-primary"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Start Transformation
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  </button>
                  
                  <button className="group relative inline-flex items-center justify-center h-16 md:h-20 px-10 md:px-14 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-white transition-all active:scale-95 w-full sm:w-auto rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 hover:border-white/20 ring-1 ring-white/5">
                    <Play className="mr-3 h-3 w-3 md:h-4 md:w-4 fill-primary text-primary" />
                    View Ecosystem
                  </button>
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

      {/* Red Marquee Bar - Exact upGrad Replication */}
      <div className="w-full bg-[#E50019] relative z-20 py-3.5 border-t border-b border-white/10">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee gap-x-24">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-x-24">
                {['Enterprise AI Protocol is now live • Scale Now!', 'Global Innovation Hub: San Francisco opening • Discover!', 'MAD Algos Q3 Talent Grid active • Enrol!', 'New Partnership: Silicon Valley Enterprise • Explore!'].map((news, i) => (
                  <span key={i} className="text-[11px] font-black tracking-[0.2em] uppercase text-white flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {news}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
