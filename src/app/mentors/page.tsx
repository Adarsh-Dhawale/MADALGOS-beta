import React from "react";
import Image from "next/image";
import { ArrowRight, Briefcase } from "lucide-react";
import { mentors, MentorData } from "@/components/sections/faculty";

const MentorDetailCard = ({ mentor }: { mentor: MentorData }) => {
  return (
    <div className="group relative bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 flex flex-col h-full shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-primary/40 hover:bg-slate-900/60">
      <div className="flex items-start gap-6 mb-6">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase mb-1">
            {mentor.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground text-[11px] md:text-xs font-bold uppercase tracking-[0.15em]">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{mentor.role}</span>
          </div>
          <p className="text-secondary/80 text-[10px] md:text-[11px] font-bold mt-1 uppercase tracking-[0.2em]">
            {mentor.company}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {mentor.bio}
      </p>

      <div className="flex flex-wrap gap-2.5 mb-6">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-bold text-white/70 tracking-[0.18em] uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
        <p className="text-white font-semibold text-sm md:text-base">
          {mentor.price}
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-950 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-primary transition-colors duration-300">
          View Profile
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function MentorsPage() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              <span>Our Mentors</span>
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Meet the MAD Algos Mentor Network
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Learn directly from engineers and educators who have built products
              at top companies and coached thousands of learners into tech
              careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {mentors.map((mentor) => (
              <MentorDetailCard key={mentor.name} mentor={mentor} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

