"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Layers, Terminal, Cpu, Database } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

interface PathwayConfig {
  id: number;
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

const AccordionCard = ({ pathway }: { pathway: PathwayConfig }) => {
  const [isOpen, setIsOpen] = useState(pathway.id === 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl md:rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-6 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-3xl md:text-4xl font-extrabold text-[#E50019]">
            {pathway.id}
          </span>
          <h3 className="text-base md:text-xl font-semibold text-white text-left">
            {pathway.title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#E50019] transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border-t border-white/10"
          >
            <div className="px-6 md:px-10 pt-4 md:pt-5 pb-6 md:pb-8">
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6 md:mb-8">
                {pathway.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {pathway.images.map((image, index) => (
                  <motion.div
                    key={image.src}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                    className={cn(
                      "aspect-video rounded-2xl overflow-hidden",
                      index > 0 && "hidden sm:block"
                    )}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Curriculum = () => {
  const [activeYear, setActiveYear] = useState(1);

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
    { 
      id: 2, 
      label: 'PHASE 02', 
      sublabel: 'Core Tech', 
      icon: <Layers className="w-5 h-5" />,
      projects: [
        {
          title: "Real-Time IoT Healthcare Management",
          description: "Build a real-time healthcare monitoring platform that collects and displays patient data from IoT devices."
        },
        {
          title: "End-to-End Web Contact Center with WebRTC",
          description: "Develop a professional web contact center with WebRTC-based communication and real-time agent management."
        },
        {
          title: "Multi-Language Encrypted Chat Platform",
          description: "Design a global messaging platform with end-to-end encryption and multi-language support."
        },
        {
          title: "Real-Time Collaborative Document Editor",
          description: "Create a collaborative editor where multiple users can edit the same document simultaneously with conflict resolution."
        }
      ],
      skills: [
        "Advanced DSA",
        "SQL & DBMS",
        "Backend (MERN)",
        "Operating Systems",
        "Generative AI",
        "Cloud Computing"
      ],
      subjects: [
        "Engineering Mathematics III",
        "Data Structures & Algorithms II",
        "Database Management Systems",
        "Backend Development (MERN)",
        "Operating Systems",
        "Generative AI & Cloud Computing Fundamentals"
      ]
    },
    { 
      id: 3, 
      label: 'PHASE 03', 
      sublabel: 'Advanced AI & Quantum', 
      icon: <Cpu className="w-5 h-5" />,
      projects: [
        {
          title: "Automated Vulnerability Management Using Renovate",
          description: "Develop a DevOps automation system for dependency scanning and automated security patch management."
        },
        {
          title: "Multi-Tenant SaaS with Tenant Isolation",
          description: "Build a multi-tenant SaaS platform where multiple organizations share one system with secure data isolation."
        },
        {
          title: "Image Recognition Attendance System",
          description: "Implement face-based attendance using REST APIs and a simple analytics dashboard."
        },
        {
          title: "Smart Campus Navigation App",
          description: "Create a map-based campus guide with search, routing, and point-of-interest information."
        }
      ],
      skills: [
        "Compiler Design",
        "Artificial Intelligence",
        "Computer Architecture",
        "Deep Learning",
        "Software Engineering",
        "Quantum Programming"
      ],
      subjects: [
        "Internship I (6 Months)",
        "Compiler Design",
        "Artificial Intelligence",
        "Computer Organization & Architecture",
        "Deep Learning",
        "Global Elective 1",
        "Software Engineering"
      ]
    },
    { 
      id: 4, 
      label: 'PHASE 04', 
      sublabel: 'Industry & Innovation', 
      icon: <Database className="w-5 h-5" />,
      projects: [
        {
          title: "Enterprise Helpdesk & Ticket System",
          description: "Build an issue tracking system with roles, SLAs, and rich analytics dashboards."
        },
        {
          title: "Supply Chain Tracker with Blockchain",
          description: "Create a shipment tracking platform with tamper-proof ledgers and APIs using blockchain."
        },
        {
          title: "Smart Waste Segregation IoT System",
          description: "Design an IoT-based waste segregation system with sensors, classification models, and alert dashboards."
        },
        {
          title: "Credit Card Fraud Alert Platform",
          description: "Implement a real-time fraud detection engine on the cloud with monitoring dashboards."
        }
      ],
      skills: [
        "Computer Networks",
        "Deep Learning",
        "Product Development",
        "Agile",
        "Cloud & Distributed Systems",
        "Advanced DSA & System Design"
      ],
      subjects: [
        "Computer Networks",
        "Deep Learning",
        "Capstone Project Phase I",
        "Real-World Product Development & Agile Project Management",
        "Theory of Computation (TOC)",
        "AI-Native Cloud Architecture & Deployment"
      ]
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-32 px-6 md:px-12 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-28 max-w-5xl mx-auto">
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-5 tracking-tight leading-none whitespace-nowrap"
          >
            One Degree, <span className="text-gradient-brand">Three Pathways</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm md:text-base lg:text-lg font-medium max-w-none mx-auto tracking-tight opacity-70 leading-relaxed whitespace-nowrap"
          >
             Whether it&apos;s a MAANG job, your own startup, or a global PhD, we&apos;ve built the track for you.
          </motion.p>
        </div>

        {/* One Degree, Three Pathways cards - collapsible accordion */}
        <div className="mt-10 md:mt-16 space-y-6 md:space-y-8 max-w-6xl mx-auto">
          {[
            {
              id: 1,
              title: "High-Paying Job Pathway",
              description:
                "Get industry-ready from Day 1 with hands-on coding, hackathons, and global competitions. Learn to build disruptive tech valued by startups and MAANG firms, backed by strong internship and placement opportunities.",
              images: [
                {
                  src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
                  alt: "Students collaborating",
                },
                {
                  src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
                  alt: "Team discussion",
                },
                {
                  src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop",
                  alt: "Campus environment",
                },
              ],
            },
            {
              id: 2,
              title: "Startup Support Program",
              description:
                "A 7-semester Startup Mastery track offering mentorship, incubation, and expert guidance — with funding support for promising ventures, empowering you to launch and scale your startup while earning your degree.",
              images: [
                {
                  src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop",
                  alt: "Startup pitch",
                },
                {
                  src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
                  alt: "Founders working",
                },
                {
                  src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
                  alt: "Mentorship session",
                },
              ],
            },
            {
              id: 3,
              title: "Research & Higher Studies Advantage",
              description:
                "Master research, publishing, and academic writing skills while preparing for GRE, TOEFL, IELTS, SOPs, and scholarships — your pathway to top global universities and research careers.",
              images: [
                {
                  src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop",
                  alt: "Graduation",
                },
                {
                  src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
                  alt: "Research lab",
                },
                {
                  src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop",
                  alt: "Classroom",
                },
              ],
            },
          ].map((pathway) => (
            <AccordionCard key={pathway.id} pathway={pathway} />
          ))}
        </div>

        {/* Practical learning heading */}
        <div className="mt-20 md:mt-28 text-center max-w-4xl mx-auto">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase mb-3">
            Curriculum That Works
          </p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Build Industry-Preferred Skills Through{" "}
            <span className="text-gradient-brand">Practical Learning</span>
          </h3>
        </div>

        {/* Year Tabs Interface - Premium Design */}
        <div className="mt-10 relative rounded-[2.5rem] md:rounded-[4rem] border border-white/5 p-1.5 md:p-2 mb-12 md:mb-4 overflow-hidden bg-slate-950/20 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="bg-slate-900/40 rounded-[2.3rem] md:rounded-[3.8rem] p-8 md:p-16 lg:p-20 min-h-[500px] md:min-h-[600px] flex flex-col relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-20 gap-8">
              <p className="text-white/60 text-lg md:text-2xl font-bold max-w-2xl tracking-tight uppercase leading-tight text-center md:text-left">
                Phase {activeYear}:{" "}
                <span className="text-white">
                  {activeYear === 1 && "Build strong fundamentals in programming, math, and core computer science."}
                  {activeYear === 2 && "Dive deep into algorithms, data structures, and system design fundamentals."}
                  {activeYear === 3 && "Explore cutting-edge technologies including AI, ML, and quantum computing."}
                  {activeYear === 4 && "Work on real-world industry projects and innovative solutions for complex problems."}
                </span>
              </p>
               <div className="flex items-center gap-3 bg-white/5 p-1.5 md:p-2 rounded-2xl border border-white/5">
                  <div className="px-4 py-2 md:px-6 md:py-2.5 bg-primary rounded-xl text-[9px] md:text-[10px] font-bold text-slate-950 uppercase tracking-widest shadow-xl shadow-primary/20">ACTIVE PHASE</div>
                  <div className="hidden sm:block px-6 py-2.5 text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-widest">NEXT: CORE STACK</div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 flex-grow">
              {/** Resolve current year config once for readability */}
              {/*
                NOTE: We fall back to year 1 config if something goes wrong,
                but activeYear should always map correctly.
              */}
              {(() => {
                const currentYear = years.find((y) => y.id === activeYear) ?? years[0];
                return (
                  <>
              {/* Left Column: Projects */}
              <div className="lg:col-span-8">
                <h3 className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-4 justify-center lg:justify-start">
                  <div className="hidden lg:block h-[1px] w-12 bg-primary/30" />
                  Projects you&apos;ll be working on
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {currentYear.projects?.map((project, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/30 transition-all duration-700 shadow-xl"
                    >
                      <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-primary transition-colors tracking-tight uppercase">
                        {project.title}
                      </h4>
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
                  Skills you&apos;ll build
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-2.5 mb-12 md:mb-16 justify-center lg:justify-start">
                  {currentYear.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 text-white/70 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:border-secondary/50 hover:text-white transition-all duration-500 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="group relative rounded-[2rem] md:rounded-[2.5rem] border border-primary/20 bg-primary/5 overflow-hidden shadow-[0_30px_60px_rgba(45,212,191,0.05)] p-8 md:p-10 flex flex-col gap-6 md:gap-8 transition-all duration-700 hover:border-primary/40">
                    <div className="flex items-center gap-4 text-white font-bold text-lg md:text-xl uppercase tracking-tighter justify-center lg:justify-start">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      View All Subjects
                    </div>
                    <ul className="space-y-4 md:space-y-5 max-h-[260px] md:max-h-[300px] overflow-y-auto pr-1 md:pr-2">
                      {currentYear.subjects?.map((subject, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-4 text-[12px] md:text-[13px] font-bold text-gray-500 group-hover:text-gray-300 transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0 opacity-40" />
                          {subject}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-primary text-slate-950 font-bold text-[9px] md:text-[10px] tracking-[0.3em] uppercase hover:scale-[1.02] transition-transform shadow-2xl shadow-primary/20">
                      Download Full Syllabus
                    </button>
                  </div>
                </div>
              </div>
                  </>
                );
              })()}
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




      </div>
    </section>
  );
};

export default Curriculum;
