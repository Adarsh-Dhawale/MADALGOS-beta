"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AlumniSection = () => {
    const logos = [
      {
        name: "LinkedIn",
        src: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=256&h=128&auto=format&fit=crop",
        alt: "LinkedIn logo",
      },
      {
        name: "Walmart",
        src: "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?q=80&w=256&h=128&auto=format&fit=crop",
        alt: "Walmart logo",
      },
      {
        name: "PayPal",
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=256&h=128&auto=format&fit=crop",
        alt: "PayPal logo",
      },
      {
        name: "Oracle",
        src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=256&h=128&auto=format&fit=crop",
        alt: "Oracle logo",
      },
      {
        name: "Google",
        src: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=256&h=128&auto=format&fit=crop",
        alt: "Google logo",
      }
    ];

  // For the grid layout seen in the screenshots, we replicate the pattern
  const gridLogos = [
    ...logos, ...logos, ...logos, ...logos
  ].slice(0, 18);

  return (
    <section className="bg-background py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter uppercase leading-none"
        >
          <span className="text-primary italic">Global</span> <span className="text-white">Enterprise Network</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-muted-foreground text-xl mb-24 leading-relaxed font-medium opacity-60 tracking-tight"
        >
          Our graduates are architects of innovation at 3000+ global organizations, from elite Silicon Valley unicorns to Fortune 500 giants.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
          {gridLogos.map((logo, idx) => (
            <motion.div 
              key={`${logo.name}-${idx}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative flex items-center justify-center p-12 border border-white/5 transition-all duration-700 hover:bg-white/[0.03]"
            >
              <div className="relative w-full aspect-[3/1] transition-all duration-700 transform group-hover:scale-110">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="grayscale opacity-20 brightness-200 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              
              {/* Subtle hover reveal effect overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSection;
