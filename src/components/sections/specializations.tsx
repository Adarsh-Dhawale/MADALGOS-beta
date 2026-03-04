"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SpecializationCardProps {
  title: string;
  tag: string;
  description: string;
  image: string;
  className?: string;
  tagColor: string;
  index: number;
}

const SpecializationCard = ({ title, tag, description, image, className, tagColor, index }: SpecializationCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-[3rem] bg-slate-950 border border-white/5 transition-all duration-700 hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* Background Image with Premium Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover opacity-[0.15] transition-transform duration-1000 group-hover:scale-110 grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-12">
        <div>
          <span 
            className="inline-flex items-center rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-3xl border border-white/10"
            style={{ backgroundColor: `${tagColor}15` }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-3 animate-pulse" style={{ backgroundColor: tagColor }} />
            {tag}
          </span>
        </div>
        <div className="mt-auto">
          <h3 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-6 tracking-tighter uppercase transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="text-base text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity duration-700 font-medium tracking-tight">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Specializations() {
  const specs = [
    {
      title: "Artificial Intelligence & Enterprise ML",
      tag: "AI & ML",
      description: "Architect intelligent ecosystems that drive enterprise-scale transformation.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&h=400&auto=format&fit=crop",
      tagColor: "#2dd4bf",
      className: "md:col-span-2 md:row-span-2 min-h-[500px]"
    },
    {
      title: "FullStack Engineering",
      tag: "CORE DEV",
      description: "Build high-performance, scalable web architectures for global platforms.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&h=400&auto=format&fit=crop",
      tagColor: "#3b82f6",
      className: "md:col-span-1 md:row-span-1 min-h-[250px]"
    },
    {
      title: "Quantum Computation",
      tag: "QUANTUM",
      description: "Harness the power of subatomic physics for next-gen enterprise solutions.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&h=400&auto=format&fit=crop",
      tagColor: "#8b5cf6",
      className: "md:col-span-1 md:row-span-1 min-h-[250px]"
    },
    {
      title: "Distributed Ledger Tech",
      tag: "BLOCKCHAIN",
      description: "Master decentralized protocols and enterprise-grade Web3 infrastructure.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&h=400&auto=format&fit=crop",
      tagColor: "#f59e0b",
      className: "md:col-span-1 md:row-span-1 min-h-[300px]"
    },
    {
      title: "Cyber Resilience",
      tag: "SECURITY",
      description: "Establish robust security frameworks for critical enterprise assets.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&h=400&auto=format&fit=crop",
      tagColor: "#ef4444",
      className: "md:col-span-1 md:row-span-1 min-h-[300px]"
    },
    {
      title: "Cloud & Edge Innovation",
      tag: "INFRASTRUCTURE",
      description: "Design highly resilient, multi-cloud native architectures for modern scale.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&h=400&auto=format&fit=crop",
      tagColor: "#06b6d4",
      className: "md:col-span-2 md:row-span-1 min-h-[300px]"
    }
  ];

  return (
    <section className="bg-background py-16 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-8 md:mb-10 shadow-2xl"
          >
            <span>Specialization Tracks</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]"
          >
            Architect Your <span className="text-gradient-brand italic">Future</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg md:text-2xl font-medium max-w-3xl mx-auto opacity-60 tracking-tight leading-relaxed"
          >
             Advanced Computer Science tracks tailored for the next generation of global tech leadership.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-10 max-w-[1400px] mx-auto">
          {specs.map((spec, index) => (
            <SpecializationCard key={index} {...spec} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
