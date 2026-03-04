"use client";

import React from 'react';
import { Globe, Users, Zap, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalStats = () => {
  const stats = [
    {
      value: "50+",
      label: "Global Hubs",
      icon: <Globe className="w-5 h-5 text-primary" />
    },
    {
      value: "10M+",
      label: "Engineers Trained",
      icon: <Users className="w-5 h-5 text-secondary" />
    },
    {
      value: "3000+",
      label: "Recruitment Partners",
      icon: <Briefcase className="w-5 h-5 text-primary" />
    },
    {
      value: "99.9%",
      label: "SLA Success Rate",
      icon: <Zap className="w-5 h-5 text-secondary" />
    }
  ];

  return (
    <section className="bg-background py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* Left Content Column */}
          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9] uppercase"
            >
              <span className="block text-white">Silicon Valley Roots,</span>
              <span className="block text-gradient-brand italic">Global Wings</span>
            </motion.h2>

            <div className="max-w-xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-xl leading-relaxed mb-16 font-medium opacity-60 tracking-tight"
              >
                Backed by a strong international network and years of tech education expertise, MAD Algos delivers world-class talent protocols powered by deep expertise in enterprise AI. Whether you aspire to architect global systems or lead disruptive ventures, we provide the infrastructure to achieve it.
              </motion.p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {stat.icon}
                      <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-primary transition-colors tracking-tighter">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] pl-8">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                className="mt-20 border-t border-white/5 pt-10"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600">
                  * DATA REFLECTS THE STRENGTH OF THE MAD ALGOS GLOBAL ENTERPRISE NETWORK.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Map/Illustration Column */}
          <div className="relative aspect-square w-full bg-slate-950/20 rounded-[4rem] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Visual placeholder for the map illustration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white rounded-full animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-dashed border-primary rounded-full animate-reverse-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-white/30 rounded-full animate-spin-slow" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
                <Globe className="text-primary/20 w-48 h-48 md:w-64 md:h-64 animate-pulse-slow" />
            </div>

            {/* Glowing effect */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary opacity-[0.05] blur-[100px] rounded-full"></div>
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-secondary opacity-[0.05] blur-[100px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;
