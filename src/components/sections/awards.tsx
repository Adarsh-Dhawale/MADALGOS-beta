"use client";

import React from 'react';
import Image from 'next/image';
import { Award, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const awardsData = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=200&h=100&auto=format&fit=crop",
    awarder: "BW Top Education Award 2023",
    title: "EdTech of the Year",
    description: "MAD Algos recognized for B2B engineering excellence and strategic innovation.",
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=100&auto=format&fit=crop",
    awarder: "Ambition Box",
    title: "Employee Choice Award",
    description: "Rated Top #3 in Tech Firms for enterprise culture and elite talent growth.",
  },
  {
    id: 3,
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&h=100&auto=format&fit=crop",
    awarder: "The Economics Times",
    title: "Most Promising Brand",
    description: "Recognized as the most disruptive enterprise AI brand of 2026.",
  }
];

const Awards = () => {
  return (
    <section className="bg-background py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl"
          >
             <Trophy className="w-4 h-4" />
             <span>Global Recognition</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter uppercase leading-none"
          >
            Award-Winning <span className="text-gradient-brand italic">Protocol</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {awardsData.map((award, index) => (
            <motion.div 
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-950/20 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 flex flex-col items-center text-center transition-all duration-700 hover:scale-[1.02] hover:border-primary/30 shadow-2xl"
            >
              <div className="h-20 w-full relative mb-10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700 grayscale">
                <Image
                  src={award.logo}
                  alt={award.awarder}
                  width={160}
                  height={80}
                  className="object-contain max-h-full"
                />
              </div>
              
              <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase tracking-[0.3em]">
                {award.awarder}
              </p>
              
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                {award.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity font-medium">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-gray-700 mt-20 opacity-40">
          * RECOGNIZING THE MAD ALGOS ENTERPRISE ECOSYSTEM LEGACY.
        </p>
      </div>
    </section>
  );
};

export default Awards;
