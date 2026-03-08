"use client";

import React from 'react';
import Image from 'next/image';
import { Globe2, Shield, Zap, Target, Cpu, Code2, Users2, Rocket, Briefcase, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdvantageCard = ({ 
  icon, 
  title,
  isRight = false 
}: { 
  icon: React.ReactNode, 
  title: string,
  isRight?: boolean 
}) => {
  return (
    <div className={`group relative bg-white/5 border border-white/5 backdrop-blur-3xl rounded-2xl py-6 px-10 shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] flex items-center gap-6 ${isRight ? 'flex-row-reverse text-right' : 'flex-row'}`}>
      <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 p-4 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/20 text-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-lg tracking-tight leading-tight">{title}</h4>
      </div>
    </div>
  );
};

const Advantages = () => {
  const leftItems = [
    { icon: <Building2 className="w-8 h-8" />, title: 'End-to-End Prep Stack' },
    { icon: <GraduationCap className="w-8 h-8" />, title: 'Proven Placement Track Record' },
    { icon: <Users2 className="w-8 h-8" />, title: 'Active Learner Community' },
    { icon: <Briefcase className="w-8 h-8" />, title: 'FAANG/MAANG Mentors ' },
    { icon: <Globe2 className="w-8 h-8" />, title: 'Flexible 1:1 Scheduling' },
  ];

  const rightItems = [
    { icon: <Cpu className="w-8 h-8" />, title: 'Sessions by MAANG Engineers' },
    { icon: <Code2 className="w-8 h-8" />, title: 'Coding from Day 1' },
    { icon: <Zap className="w-8 h-8" />, title: 'AI/ML & System Design Focus' },
    { icon: <Target className="w-8 h-8" />, title: 'CXO Masterclasses' },
    { icon: <Rocket className="w-8 h-8" />, title: 'Tech with Management' },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 lg:px-24 bg-background overflow-hidden py-24 md:py-32">
      {/* Premium Atmospheric Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.05)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto pt-24">
        {/* Section Heading */}
          <div className="text-center mb-14 md:mb-20 max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 md:mb-6 text-white leading-tight tracking-tighter uppercase"
            >
              Best of Both <span className="text-gradient-brand">World</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto font-medium tracking-tight leading-relaxed opacity-70 px-4"
            >
              Where World-Class University Meets Silicon Valley-Style Tech Learning.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 md:gap-12 lg:gap-8">
            
            {/* Left Column: MADAlgos */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6 order-2 lg:order-1">
              <h3 className="text-lg md:text-xl font-black tracking-tight text-white mb-4 md:mb-6 uppercase opacity-60 text-center lg:text-left">
                The MAD Algos Edge
              </h3>
              {leftItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AdvantageCard icon={item.icon} title={item.title} />
                </motion.div>
              ))}
            </div>

            {/* Central Rotating Globe - upGrad replication */}
            <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 py-10">
              <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px] aspect-square group">
              {/* Globe Core with Glow */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
              
              {/* Globe: Unsplash (open-source) only — no third-party video */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(45,212,191,0.15)] bg-[#020617]">
                 <Image
                   src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
                   alt=""
                   fill
                   className="object-cover opacity-80 mix-blend-screen scale-110 animate-spin-slow"
                 />
                 
                 {/* Latitude/Longitude Grid Overlay (SVG) */}
                 <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {[...Array(6)].map((_, i) => (
                        <ellipse key={i} cx="50" cy="50" rx={45 - (i*6)} ry="48" fill="none" stroke="white" strokeWidth="0.2" className="animate-pulse" style={{ animationDelay: `${i*0.5}s` }} />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <ellipse key={i} cx="50" cy="50" rx="48" ry={45 - (i*6)} fill="none" stroke="white" strokeWidth="0.2" className="animate-pulse" style={{ animationDelay: `${i*0.5}s` }} />
                      ))}
                    </svg>
                 </div>
                 
                 {/* Inner Shadow for Spherical Depth */}
                 <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)] z-20 pointer-events-none" />
              </div>
              
              {/* Floating Status Badges - around the globe */}
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 px-6 py-4 rounded-2xl bg-slate-950/80 backdrop-blur-3xl border border-white/10 shadow-2xl z-30 flex items-center gap-3"
              >
                 <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                 <span className="text-[10px] font-black tracking-widest uppercase text-white">4.2k Active Nodes</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 px-6 py-4 rounded-2xl bg-slate-950/80 backdrop-blur-3xl border border-white/10 shadow-2xl z-30 flex items-center gap-3"
              >
                 <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                 <span className="text-[10px] font-black tracking-widest uppercase text-white">Scale: Global</span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Silicon Valley Style Learning / Disruptive Protocol */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6 order-3">
            <h3 className="text-lg md:text-xl font-black tracking-tight text-white mb-4 md:mb-6 uppercase opacity-60">
              Silicon Valley Style Learning
            </h3>
            {rightItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <AdvantageCard icon={item.icon} title={item.title} isRight={true} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Advantages;
