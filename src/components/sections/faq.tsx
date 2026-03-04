"use client";

import React, { useState } from "react";
import { ChevronRight, Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "What is the MAD Algos Talent Protocol?",
    answer: "The MAD Algos Talent Protocol is a premiere technology institution focused on delivering next-generation computer science programs designed in collaboration with global tech giants. We offer B.Tech programs that prioritize practical learning, industry mentorship, and specialized career pathways.",
  },
  {
    question: "Is the MAD Algos certification recognized globally?",
    answer: "Yes, our programs are offered in collaboration with UGC-recognized universities. Students receive a legitimate B.Tech degree that is recognized for higher studies and employment both in India and abroad.",
  },
  {
    question: "How is the curriculum different from traditional colleges?",
    answer: "Our curriculum is 'Silicon Valley-style', meaning it's tech-first and updated every six months. We focus on coding from day one, sessions by MAANG engineers, and mandatory internships, departing from the legacy rote-learning models.",
  },
  {
    question: "What specializations are available?",
    answer: "Currently, we offer cutting-edge specializations in Artificial Intelligence & Machine Learning, FullStack Web Development, Cybersecurity, Blockchain, and Cloud Innovation, among others.",
  },
  {
    question: "Does the program offer placement support?",
    answer: "Absolutely. We have a dedicated career services cell that provides 1-on-1 mentorship, resume building, and connections with our network of 3000+ hiring partners across startups, unicorns, and global tech giants.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl"
          >
             <HelpCircle className="w-4 h-4" />
             <span>Knowledge Base</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter uppercase"
          >
            System <span className="text-gradient-brand italic">Queries</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-60 tracking-tight leading-relaxed"
          >
            Detailed protocols and operational insights for the MAD Algos ecosystem.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group rounded-[2.5rem] border transition-all duration-700 overflow-hidden",
                  openIndex === index 
                    ? "bg-slate-950/40 border-primary/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)]" 
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-10 text-left focus:outline-none"
                >
                  <span className={cn(
                    "text-xl md:text-2xl font-bold tracking-tight uppercase transition-colors duration-700",
                    openIndex === index ? "text-primary" : "text-white"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700",
                    openIndex === index ? "bg-primary text-slate-950 rotate-90" : "bg-white/5 text-primary group-hover:bg-white/10"
                  )}>
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="px-10 pb-12">
                        <p className="text-lg text-muted-foreground leading-relaxed font-medium opacity-70">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-20 flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-4 bg-primary text-slate-950 font-bold py-6 px-12 rounded-2xl text-[10px] tracking-[0.4em] uppercase transition-all duration-300 shadow-2xl shadow-primary/20"
            >
              <span>Explore Knowledge Base</span>
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
