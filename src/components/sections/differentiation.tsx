"use client";

import React from 'react';
import { Brain, GraduationCap, Globe, Lightbulb, MapPin, ShieldCheck, Banknote, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Future-Ready Curriculum",
    desc: "Stay updated with the latest in GenAI, MLOps, Quantum Computing, and Cybersecurity every six months.",
    icon: <Brain className="w-12 h-12" />,
  },
  {
    title: "WorkX360 Internship Program",
    desc: "Gain paid, real-world experience through rotational internships with top startups and companies.",
    icon: <GraduationCap className="w-12 h-12" />,
  },
  {
    title: "Global Learning Experience",
    desc: "Explore semester-abroad programs and global competitions for wider exposure.",
    icon: <Globe className="w-12 h-12" />,
  },
  {
    title: "Innovation Through Action",
    desc: "Regular hackathons, open-source projects, and sponsorships for GSoC, ICPC, and NASA contests.",
    icon: <Lightbulb className="w-12 h-12" />,
  },
  {
    title: "Personalized Growth Tracks",
    desc: "Choose your path—high-paying jobs, entrepreneurship, or research—from the very first day.",
    icon: <MapPin className="w-12 h-12" />,
  },
  {
    title: "Lifelong Career Support",
    desc: "Get internship and job application support for your career growth throughout your journey.",
    icon: <ShieldCheck className="w-12 h-12" />,
  },
  {
    title: "Smart Scholarships & Support",
    desc: "Access up to 100% scholarships with flexible, stress-free financing options for all.",
    icon: <Banknote className="w-12 h-12" />,
  },
  {
    title: "Strong Network, Strong Careers",
    desc: "Connect with 3000+ hiring partners and benefit from active alumni-driven placements.",
    icon: <Users className="w-12 h-12" />,
  },
];

const DifferentiationSection = () => {
  return (
    <section className="bg-background py-40 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(45,212,191,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none"
          >
            How We're <span className="text-gradient-brand italic">Built Different</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto font-medium opacity-60 tracking-tight"
          >
            From big dreams to bold outcomes, your runway to limitless possibilities.
          </motion.p>
        </div>

        {/* Integrated 4x2 Grid - Architectural & Premium */}
        <div className="relative border border-white/10 rounded-[4rem] overflow-hidden bg-white/[0.01] backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 opacity-30">
             <div className="border-r border-white/10 hidden lg:block" />
             <div className="border-r border-white/10 hidden lg:block" />
             <div className="border-r border-white/10 hidden lg:block" />
          </div>
          <div className="absolute inset-0 pointer-events-none grid grid-rows-2 opacity-30">
             <div className="border-b border-white/10 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group p-12 flex flex-col items-center text-center transition-all duration-700 hover:bg-white/[0.03]"
              >
                <div className="w-24 h-24 mb-10 rounded-[2rem] bg-white/5 flex items-center justify-center text-primary transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 border border-white/10 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(45,212,191,0.15)]">
                   {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 transition-colors group-hover:text-primary tracking-tight leading-tight uppercase">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] opacity-60 group-hover:opacity-100 transition-opacity">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
