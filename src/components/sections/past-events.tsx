"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Past events that have occurred — builds credibility
const pastEventCards = [
  {
    tag: 'COLLEGE SEMINAR',
    location: 'VBIT, Hyderabad',
    title: 'DSA Masterclass for Final Year Students',
    detail: '50+ Attendees',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&h=500&auto=format&fit=crop',
  },
  {
    tag: '1:1 MENTOR MEET',
    location: 'On Campus',
    title: 'Mentors from Amazon · Microsoft · Paytm',
    detail: '1:1 sessions at college',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&h=500&auto=format&fit=crop',
  },
  {
    tag: 'DSA & AI TOOLS',
    location: 'Workshop · College',
    title: 'DSA & AI Tools Hands-On Sessions',
    detail: 'Sessions delivered on campus',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&h=500&auto=format&fit=crop',
  },
];

const PastEventsSection = () => {
  return (
    <section className="bg-background py-16 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(20,184,166,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 shadow-2xl ring-1 ring-white/5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Past Sessions</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter uppercase leading-tight"
          >
            What We&apos;ve <span className="text-gradient-brand">Done</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight opacity-70"
          >
            Seminars at real colleges, 1:1 mentor meets on campus, and DSA & AI tools sessions — MAD Algos is already out there with students.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pastEventCards.map((card, index) => (
            <motion.article
              key={card.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-slate-950/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.02] hover:border-primary/40 ring-1 ring-white/5"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20 opacity-60" />

              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/10 text-[9px] font-black text-primary tracking-[0.25em] uppercase z-10">
                  {card.tag}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white/90 text-xs font-medium z-10">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                  <span>{card.location}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0 text-primary/80" />
                  {card.detail}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;
