"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Layers, Terminal, Cpu, Database } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

const Curriculum = () => {
  const [activeYear, setActiveYear] = useState(1);
  const [activePathway, setActivePathway] = useState('Enterprise');

  const years = [
    { 
      id: 1, 
      label: 'PHASE 01', 
      sublabel: 'Foundations',
      icon: <Terminal className="w-5 h-5" />,
      projects: [
        {
          title: "Online Reporting & Flight Booking Platform",
          description: "Build an online flight booking platform where users can search flights, make bookings, and generate detailed travel and expense reports."
        },
        {
          title: "Dynamic UI with JSON Configs",
          description: "Develop a configuration-driven UI framework enabling dynamic layouts, forms, and behaviors without code changes."
        },
        {
          title: "Distributed Payment Processor with Webhook Retry",
          description: "Build a fault-tolerant payment processor with distributed architecture and reliable webhook delivery."
        },
        {
          title: "API Gateway: Rate Limiting & Circuit Breaker",
          description: "Build a resilient API gateway to manage traffic, prevent abuse, and handle service failures gracefully."
        }
      ],
      skills: ["Python", "Java", "Engineering Mathematics", "DSA", "Frontend (HTML, CSS, JS, React)", "Linux", "Git & GitHub"],
      subjects: ["Python", "Engineering Mathematics I", "Web Essentials", "Data Structures & Algorithms I", "FrontEnd Development", "Engineering Mathematics II", "Java"]
    },
    { id: 2, label: 'PHASE 02', sublabel: 'Core Tech', icon: <Layers className="w-5 h-5" /> },
    { id: 3, label: 'PHASE 03', sublabel: 'Advanced AI', icon: <Cpu className="w-5 h-5" /> },
    { id: 4, label: 'PHASE 04', sublabel: 'Industry Ops', icon: <Database className="w-5 h-5" /> }
  ];

  const pathways = [
    { id: 'Enterprise', label: 'Enterprise Strategy' },
    { id: 'Research', label: 'Deep Tech Research' }
  ];

  const entrepreneurshipCards = [
    {
      title: "Startup Mindset & Problem Discovery",
      desc: "Understand startups, global ecosystems, and problem-solving frameworks. Develop a creative, risk-taking mindset."
    },
    {
      title: "Idea Validation Basics",
      desc: "Generate ideas using brainstorming and mind mapping. Build teams, define value propositions, and craft your story."
    },
    {
      title: "Entrepreneurial Mindset & Skill Development",
      desc: "Students understand the mindset needed to become an entrepreneur and learn how to apply these skills in real-world scenarios."
    },
    {
      title: "Teamwork & Communication",
      desc: "Students learn how to communicate ideas clearly and work effectively in teams to turn ideas into reality."
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-32 px-6 md:px-12 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-32 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-8 md:mb-10 shadow-2xl"
          >
             <span>Advanced Curriculum</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tighter leading-none"
          >
            Architect <span className="text-gradient-brand">Enterprise Skills</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg md:text-2xl font-medium max-w-3xl mx-auto tracking-tight opacity-60 leading-relaxed"
          >
             Master industry-grade engineering and strategic leadership through our intensive, phase-based learning model.
          </motion.p>
        </div>

        {/* Year Tabs Interface - Premium Design */}
        <div className="relative rounded-[2.5rem] md:rounded-[4rem] border border-white/5 p-1.5 md:p-2 mb-12 md:mb-20 overflow-hidden bg-slate-950/20 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="bg-slate-900/40 rounded-[2.3rem] md:rounded-[3.8rem] p-8 md:p-16 lg:p-20 min-h-[500px] md:min-h-[600px] flex flex-col relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-20 gap-8">
               <p className="text-white/60 text-lg md:text-2xl font-bold max-w-2xl tracking-tight uppercase leading-tight text-center md:text-left">
                 Phase {activeYear}: <span className="text-white">Master fundamental engineering protocols and core logic.</span>
               </p>
               <div className="flex items-center gap-3 bg-white/5 p-1.5 md:p-2 rounded-2xl border border-white/5">
                  <div className="px-4 py-2 md:px-6 md:py-2.5 bg-primary rounded-xl text-[9px] md:text-[10px] font-bold text-slate-950 uppercase tracking-widest shadow-xl shadow-primary/20">ACTIVE PHASE</div>
                  <div className="hidden sm:block px-6 py-2.5 text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-widest">NEXT: CORE STACK</div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 flex-grow">
              {/* Left Column: Projects */}
              <div className="lg:col-span-8">
                <h3 className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-4 justify-center lg:justify-start">
                   <div className="hidden lg:block h-[1px] w-12 bg-primary/30" />
                   CORE MISSION PROJECTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {years[0].projects?.map((project, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/30 transition-all duration-700 shadow-xl"
                    >
                      <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-primary transition-colors tracking-tight uppercase">{project.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                        {project.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Skills & Subjects */}
              <div className="lg:col-span-4 flex flex-col h-full mt-8 lg:mt-0">
                <h3 className="text-[9px] md:text-[10px] font-bold text-secondary uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-4 justify-center lg:justify-start">
                   <div className="hidden lg:block h-[1px] w-12 bg-secondary/30" />
                   SKILL PROTOCOLS
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-2.5 mb-12 md:mb-16 justify-center lg:justify-start">
                  {years[0].skills?.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 text-white/70 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:border-secondary/50 hover:text-white transition-all duration-500 cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                   <div className="group relative rounded-[2rem] md:rounded-[2.5rem] border border-primary/20 bg-primary/5 overflow-hidden shadow-[0_30px_60px_rgba(45,212,191,0.05)] p-8 md:p-10 flex flex-col gap-6 md:gap-8 transition-all duration-700 hover:border-primary/40">
                      <div className="flex items-center gap-4 text-white font-bold text-lg md:text-xl uppercase tracking-tighter justify-center lg:justify-start">
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        PHASE CURRICULUM
                      </div>
                      <ul className="space-y-4 md:space-y-5">
                        {years[0].subjects?.map((subject, idx) => (
                          <li key={idx} className="flex items-center gap-4 text-[12px] md:text-[13px] font-bold text-gray-500 group-hover:text-gray-300 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0 opacity-40" />
                            {subject}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-primary text-slate-950 font-bold text-[9px] md:text-[10px] tracking-[0.3em] uppercase hover:scale-[1.02] transition-transform shadow-2xl shadow-primary/20">
                         DOWNLOAD FULL SYLLABUS
                      </button>
                   </div>
                </div>
              </div>
            </div>

            {/* Year Switcher */}
            <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/5">
              <div className="flex flex-wrap md:flex-nowrap items-center bg-slate-950/60 backdrop-blur-3xl border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl p-1 md:p-1.5">
                {years.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => setActiveYear(year.id)}
                    className={cn(
                      "flex-1 flex flex-col items-center md:items-start justify-center px-6 md:px-10 py-5 md:py-8 rounded-[1.3rem] md:rounded-[2.2rem] transition-all duration-700 relative",
                      activeYear === year.id 
                      ? 'bg-primary text-slate-950 shadow-2xl active:scale-95' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                       <span className={cn(
                         "transition-colors duration-700",
                         activeYear === year.id ? 'text-slate-950' : 'text-primary'
                       )}>{year.icon}</span>
                       <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase">{year.label}</span>
                    </div>
                    <span className={cn(
                      "text-[12px] md:text-[14px] font-bold tracking-tighter uppercase",
                      activeYear === year.id ? 'text-slate-950/40' : 'text-gray-700'
                    )}>
                      {year.sublabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section: Pathways */}
        <div className="mt-16 md:mt-32">
          <div className="flex gap-4 mb-10 md:mb-16 overflow-x-auto pb-4 md:pb-6 scrollbar-hide">
            {pathways.map((pathway) => (
              <button
                key={pathway.id}
                onClick={() => setActivePathway(pathway.id)}
                className={cn(
                  "px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em] transition-all duration-700 whitespace-nowrap border shadow-2xl transform active:scale-95",
                  activePathway === pathway.id
                  ? 'bg-primary text-slate-950 border-primary shadow-primary/20'
                  : 'bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white'
                )}
              >
                {pathway.label}
              </button>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-1.5 md:p-2 rounded-[2.5rem] md:rounded-[4.5rem] border border-white/5 overflow-hidden shadow-2xl bg-slate-950/20"
          >
             <div className="absolute top-0 left-0 w-80 h-1 bg-gradient-to-r from-primary/60 via-secondary/60 to-transparent z-20"></div>
             
             <div className="bg-slate-900/40 backdrop-blur-3xl p-8 md:p-20 lg:p-24 rounded-[2.3rem] md:rounded-[4.3rem]">
                <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-20">
                   <div className="h-10 md:h-14 w-[3px] md:w-[4px] bg-gradient-to-b from-primary to-secondary" />
                   <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase">{activePathway} <span className="text-gradient-brand italic">Ecosystem</span></h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                  {entrepreneurshipCards.map((card, idx) => (
                    <div key={idx} className="group relative h-full">
                      <div className="h-full p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-white/[0.01] transition-all duration-700 hover:bg-white/[0.03] hover:border-primary/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] hover:-translate-y-3 flex flex-col">
                        <div className="w-12 h-1.5 md:w-16 md:h-2 bg-primary/10 group-hover:bg-primary transition-all duration-500 rounded-full mb-8 md:mb-10"></div>
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight group-hover:text-primary transition-colors uppercase">
                          {card.title}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
