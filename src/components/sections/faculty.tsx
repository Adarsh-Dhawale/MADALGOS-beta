"use client";

import React from 'react';
import Image from 'next/image';
import { UserCheck, Star, ArrowRight, Briefcase, Verified } from 'lucide-react';
import { motion } from 'framer-motion';

interface MentorData {
  name: string;
  role: string;
  company: string;
  bio: string;
  tags: string[];
  price: string;
  image: string;
}

const mentors: MentorData[] = [
  {
    name: "Shailendra Acharya",
    role: "Senior Software Engineer",
    company: "Amazon | Paytm",
    bio: "Expert in architecting distributed systems and high-scale enterprise solutions. Specializing in interview optimization for FAANG roles.",
    tags: ["Distributed Systems", "LLD / HLD", "Java Mastery", "Scale Strategy"],
    price: "Enterprise Track",
    image: "https://images.unsplash.com/photo-1519085185750-74071747e09c?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Shradha Ranjan",
    role: "Engineering Lead",
    company: "Microsoft | Adobe",
    bio: "Deep expertise in full-stack cloud ecosystems and agile enterprise transformation. Mentoring the next gen of cloud architects.",
    tags: ["Cloud Native", "React Ecosystem", "Agile Flow", "Azure Arch"],
    price: "Strategic Track",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Aman Kesarwani",
    role: "Principal DevOps Architect",
    company: "Nagarro | Google Cloud",
    bio: "Specialist in CI/CD automation, Kubernetes orchestration, and site reliability engineering at global scale.",
    tags: ["K8s", "GCP", "Infrastructure as Code", "SRE"],
    price: "Platform Track",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    name: "Gaurav Rai",
    role: "Sr. Software Engineer (L5)",
    company: "ServiceNow | IIT Patna",
    bio: "ICPC Regionalist with a focus on algorithmic efficiency and high-performance backend engineering.",
    tags: ["Advanced Algorithms", "C++ Systems", "Data Mastery", "Complexity"],
    price: "Algorithms Track",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop",
  }
];

const MentorCard = ({ mentor, index }: { mentor: MentorData, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-slate-950/20 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/5 flex flex-col h-full transition-all duration-700 hover:scale-[1.02] hover:border-primary/30 hover:bg-slate-900/40 shadow-2xl"
    >
      {/* Verified Badge */}
      <div className="absolute top-8 right-10">
         <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest shadow-lg">
            <Verified className="w-3.5 h-3.5 fill-primary/20" />
            <span>Elite Mentor</span>
         </div>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-8 mb-10">
        <div className="relative w-28 h-28 rounded-[2rem] border border-white/10 overflow-hidden group-hover:border-primary/40 transition-all duration-700 shadow-2xl">
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors tracking-tight uppercase">
            {mentor.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-2 font-bold text-[11px] uppercase tracking-[0.1em] opacity-60">
             <Briefcase className="w-4 h-4 text-primary" />
             {mentor.role}
          </div>
          <p className="text-secondary/80 text-[10px] font-bold mt-2 uppercase tracking-[0.2em]">{mentor.company}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-10 line-clamp-3 font-medium opacity-60 group-hover:opacity-100 transition-opacity">
        {mentor.bio}
      </p>

      {/* Specialized Tags */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="px-5 py-2.5 rounded-2xl border border-white/5 text-[10px] font-bold text-white/50 bg-white/5 hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default uppercase tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Footer */}
      <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">ACCESS LEVEL</p>
          <p className="text-white font-bold text-xl tracking-tight uppercase">
            {mentor.price}
          </p>
        </div>
        <button className="h-16 px-10 rounded-2xl bg-white text-slate-950 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-primary transition-all duration-300 transform active:scale-95 shadow-2xl flex items-center gap-3">
          SECURE SLOT <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const FacultySection = () => {
  return (
    <section className="bg-background py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl"
          >
             <UserCheck className="w-4 h-4" />
             <span>Enterprise Advisory</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
          >
            The <span className="text-gradient-brand">MAANG</span> Network
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight opacity-60 leading-relaxed"
          >
            Direct access to the industry's most influential engineering minds and enterprise architects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {mentors.map((mentor, index) => (
            <MentorCard key={index} mentor={mentor} index={index} />
          ))}

          {/* Premium Expansion Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-[3.5rem] p-16 border border-primary/20 flex flex-col items-center justify-center text-center group border-dashed hover:bg-primary/10 transition-all duration-700 shadow-[0_40px_80px_rgba(45,212,191,0.05)]"
          >
             <h3 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tighter leading-[0.9] uppercase">
               Access Our Global <br /> <span className="text-primary italic">Advisory Core</span>
             </h3>
             <button className="h-18 px-14 rounded-2xl bg-primary text-slate-950 font-bold text-[10px] uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-[0_25px_50px_rgba(45,212,191,0.3)] flex items-center gap-4">
               EXPLORE ALL MENTORS <ArrowRight className="w-5 h-5" />
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
