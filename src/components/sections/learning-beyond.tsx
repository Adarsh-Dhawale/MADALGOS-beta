"use client";

import React, { useState } from 'react';
import { ChevronRight, Rocket, Code, Globe, Zap, Cpu, Search, Share2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface ProgramFeature {
  id: string;
  title: string;
  icon: React.ReactNode;
  cards: Array<{
    title: string;
    description: string;
    linkText?: string;
  }>;
}

const programFeatures: ProgramFeature[] = [
  {
    id: 'innovation-lab',
    title: 'Innovation & Entrepreneurship Lab',
    icon: <Rocket className="w-6 h-6" />,
    cards: [
      {
        title: 'From Idea to Prototype',
        description: 'Every great startup begins with curiosity - and the courage to build something new. Students identify real-world problems, brainstorm ideas, and validate them using structured frameworks.'
      },
      {
        title: 'Pitch, Fund & Launch',
        description: "Once the idea is shaped, it's time to pitch! Students learn to design investor-ready pitch decks that clearly articulate value, traction, and market potential."
      },
      {
        title: 'Scale with Strategy',
        description: 'Turning a prototype into a sustainable business takes strategy, systems, and persistence. Students explore operations management and marketing automation.'
      }
    ]
  },
  {
    id: 'open-source',
    title: 'Open Source Culture',
    icon: <Code className="w-6 h-6" />,
    cards: [
      {
        title: 'Contributing to Global Projects',
        description: 'Master the art of collaboration by contributing to major open-source repositories. Learn Git workflows, documentation, and community standards used by developers worldwide.'
      }
    ]
  },
  {
    id: 'industry-immersion',
    title: 'Industry Immersion Programs',
    icon: <Globe className="w-6 h-6" />,
    cards: [
      {
        title: 'Silicon Valley Experience',
        description: 'Direct exposure to how big tech works. Workshops led by engineers from FAANG/MAANG companies and visits to innovation hubs.'
      }
    ]
  }
];

export default function LearningBeyondClassroom() {
  const [activeTab, setActiveTab] = useState('innovation-lab');

  const activeContent = programFeatures.find((f) => f.id === activeTab);

  return (
    <section className="bg-background py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto relative z-10 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-32">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl"
            >
               <span>Ecosystem Expansion</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-white uppercase"
            >
              Learning Beyond <br />
              <span className="text-gradient-brand italic">The Classroom</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md pb-6"
          >
            <p className="text-muted-foreground text-xl font-medium leading-relaxed border-l-2 border-primary/30 pl-10 opacity-60">
              True excellence transcends the lecture hall. MAD Algos provides the infrastructure for real-world impact and enterprise-scale innovation.
            </p>
          </motion.div>
        </div>

        <div className="p-2 rounded-[4.5rem] border border-white/5 bg-slate-950/20 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 md:p-12 lg:p-16">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {programFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "group relative flex items-center justify-between w-full p-8 rounded-[2rem] text-left transition-all duration-700 border font-bold text-[10px] sm:text-[12px] tracking-[0.2em] uppercase",
                    activeTab === feature.id
                      ? 'bg-primary border-primary text-slate-950 shadow-2xl shadow-primary/20 translate-x-3'
                      : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:border-white/10 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-6">
                     <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-700 shadow-xl",
                        activeTab === feature.id ? "bg-slate-950/20 text-slate-950" : "bg-white/5 text-primary"
                     )}>
                        {feature.icon}
                     </div>
                     <span className="max-w-[240px] leading-tight">{feature.title}</span>
                  </div>
                  <ChevronRight 
                    className={cn(
                      "w-6 h-6 transition-transform duration-700",
                      activeTab === feature.id ? 'translate-x-1' : 'group-hover:translate-x-3'
                    )} 
                  />
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {activeContent?.cards.map((card, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all duration-700 hover:bg-white/[0.04] hover:border-primary/30 shadow-2xl"
                >
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                     <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
                       {card.title}
                     </h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium opacity-60">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
