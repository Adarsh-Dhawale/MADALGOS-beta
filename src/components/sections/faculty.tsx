"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, ArrowRight, Briefcase, Verified } from 'lucide-react';
import { motion } from 'framer-motion';

export interface HomeMentorCard {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string | null;
  isVerified: boolean;
}

const MentorCard = ({ mentor }: { mentor: HomeMentorCard }) => {
  return (
    <Link
      href="/mentors"
      className="group relative bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] px-8 py-6 border border-white/5 flex items-center gap-6 min-w-[260px] md:min-w-[320px] h-[140px] transition-all duration-500 hover:border-primary/40 hover:bg-slate-900/50 shadow-2xl"
    >
      {/* Profile Header */}
      <div className="flex items-center gap-5">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 overflow-hidden group-hover:border-primary/40 transition-all duration-700 shadow-2xl">
          {mentor.image ? (
            <Image
              src={mentor.image}
              alt={mentor.name}
              fill
              className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground bg-white/5">
              N/A
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <h3 className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight uppercase truncate">
              {mentor.name}
            </h3>
            {mentor.isVerified && (
              <Verified className="w-4 h-4 text-primary shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mt-1 font-bold text-[10px] md:text-[11px] uppercase tracking-[0.1em] opacity-60 truncate">
             <Briefcase className="w-4 h-4 text-primary" />
             {mentor.role}
          </div>
          <p className="text-secondary/80 text-[9px] md:text-[10px] font-bold mt-1 uppercase tracking-[0.2em] truncate">
            {mentor.company}
          </p>
        </div>
      </div>
    </Link>
  );
};

const FacultySection = ({ mentors }: { mentors: HomeMentorCard[] }) => {
  const safeMentors = Array.isArray(mentors) ? mentors : [];
  return (
    <section className="bg-background py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24 max-w-full mx-auto">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl"
            >
              <UserCheck className="w-4 h-4" />
              <span>Our Mentors</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter whitespace-nowrap inline-block mx-auto"
            >
              Taught by World&apos;s Top Tech and Academic Minds
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-muted-foreground text-base md:text-xl font-medium max-w-2xl mx-auto tracking-tight opacity-70 leading-relaxed"
          >
            Industry experts and innovators who turn real-world experience into transformative learning.
          </motion.p>
        </div>
        {/* Horizontal marquee of mentors */}
        <div className="relative max-w-6xl mx-auto">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/70 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/70 to-transparent z-20" />

          <div className="overflow-hidden py-4">
            <div className="flex gap-6 animate-[marquee_45s_linear_infinite]">
              {[...safeMentors, ...safeMentors].map((mentor, idx) => (
                <MentorCard key={`${mentor.name}-${idx}`} mentor={mentor} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/mentors"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.3em] uppercase text-white hover:bg-primary hover:text-slate-950 hover:border-primary transition-all duration-300 shadow-2xl"
            >
              View All Mentors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
