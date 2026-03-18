"use client";

import React from 'react';
import Image from 'next/image';
import { Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { LEGACY_TESTIMONIALS, MAD_ALGOS_LOGO } from "@/lib/legacy-testimonials";

interface TestimonialData {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard = ({ testimonial, index }: { testimonial: TestimonialData, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group bg-slate-900/30 backdrop-blur-3xl rounded-[3rem] p-12 pt-24 border border-white/5 shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:border-primary/30 hover:bg-slate-900/50 flex flex-col h-full"
    >
      {/* Profile Image & Logo Overlay */}
      <div className="absolute top-0 left-12 -translate-y-1/2 w-32 h-32">
        <div className="relative w-full h-full rounded-[2.5rem] border-[6px] border-slate-950 shadow-2xl overflow-hidden group-hover:border-primary/50 transition-all duration-700 bg-slate-900/80 flex items-center justify-center p-4">
          <Image
            src={testimonial.image}
            alt="MAD Algos"
            fill
            className="object-contain scale-95 group-hover:scale-100 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>
        {/* MAD Algos Logo Badge Overlay */}
        <div className="absolute -bottom-4 right-0 bg-slate-950 rounded-2xl p-3 shadow-2xl border border-white/10 group-hover:border-primary transition-all duration-500">
           <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border border-primary" />
              <div className="w-0 h-0 border-l-[6px] border-l-secondary border-y-[4px] border-y-transparent" />
              <div className="w-3 h-3 rounded-sm bg-primary" />
           </div>
        </div>
      </div>

      {/* Role with Premium Typography */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-primary"><CheckCircle2 className="w-4 h-4" /></span>
          <h3 className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">
            {testimonial.name}
          </h3>
        </div>
        <p className="text-white font-bold text-2xl leading-tight tracking-tight uppercase">
          {testimonial.role}
        </p>
      </div>

      {/* Content */}
      <div className="relative mb-12 flex-1">
        <div className="absolute -left-6 -top-6 opacity-[0.03]">
           <Quote className="w-20 h-20 text-white fill-current" />
        </div>
        <p className="text-muted-foreground italic text-lg leading-relaxed relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
          &quot;{testimonial.content}&quot;
        </p>
      </div>

      {/* Trust Badge / Footer */}
      <div className="pt-8 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Verified Protocol</span>
         </div>
         <div className="text-[10px] font-bold text-primary/50 uppercase tracking-widest italic">MAD Algos Elite</div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [items, setItems] = React.useState<TestimonialData[]>(LEGACY_TESTIMONIALS);

  React.useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data: { testimonials?: TestimonialData[] }) => {
        if (Array.isArray(data.testimonials) && data.testimonials.length) {
          setItems(
            data.testimonials.map((t) => ({
              ...t,
              image: t.image || MAD_ALGOS_LOGO,
            }))
          );
        }
      })
      .catch(() => null);
  }, []);

  return (
    <section className="bg-background py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header - Refined White Pill Style */}
        <div className="text-center mb-32">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block px-16 py-6 rounded-full border border-white/10 bg-white shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
           >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tighter leading-none uppercase">
                Enterprise <span className="text-primary-foreground/40 italic">Validation</span>
              </h2>
           </motion.div>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-12 text-muted-foreground text-xl font-medium max-w-2xl mx-auto opacity-60"
           >
             Hear from the global leaders who have transformed their trajectories through the MAD Algos ecosystem.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          {items.map((item, index) => (
            <TestimonialCard key={index} testimonial={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
