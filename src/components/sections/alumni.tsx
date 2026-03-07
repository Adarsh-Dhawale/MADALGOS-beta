"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollableMarquee } from "@/components/ui/scrollable-marquee";

const AlumniSection = () => {
  const logos = [
    { name: "Microsoft", src: "https://img.logo.dev/microsoft.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "Amazon", src: "https://img.logo.dev/amazon.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "Samsung", src: "https://img.logo.dev/samsung.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "J.P. Morgan", src: "https://img.logo.dev/jpmorganchase.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "Walmart", src: "https://img.logo.dev/walmart.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "Capgemini", src: "https://img.logo.dev/capgemini.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "TCS", src: "https://img.logo.dev/tcs.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
    { name: "Google", src: "https://img.logo.dev/google.com?token=pk_J68nV3eLS8C3y2kWZfKEFw&retina=true" },
  ];

  return (
    <section className="bg-background py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          <span className="text-primary">MAD Algos</span> Alumni work at
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg opacity-70"
        >
          Our learners are placed across leading global tech companies,
          high-growth startups, and unicorns worldwide.
        </motion.p>

        {/* Logo Marquee — faster, user can scroll/drag */}
        <div className="relative mt-24">
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <ScrollableMarquee speed={140} className="py-4" innerClassName="flex gap-12 items-center">
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="relative h-32 w-64 md:h-40 md:w-72 flex-shrink-0 overflow-hidden rounded-2xl bg-white"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="300px"
                  style={{ objectFit: "cover" }}
                  className="brightness-105 contrast-110"
                />
              </div>
            ))}
          </ScrollableMarquee>
        </div>

      </div>
    </section>
  );
};

export default AlumniSection;