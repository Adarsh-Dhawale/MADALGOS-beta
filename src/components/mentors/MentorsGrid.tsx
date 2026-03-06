"use client";

import { useState } from "react";
import MentorCard, { MentorCardProps } from "./MentorCard";

interface MentorsGridProps {
  mentors: MentorCardProps[];
}

export default function MentorsGrid({ mentors }: MentorsGridProps) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? mentors : mentors.slice(0, 10);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {visible.map((mentor) => (
          <MentorCard key={mentor.name + mentor.joined} {...mentor} />
        ))}
      </div>

      {mentors.length > 10 && !showAll && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.3em] uppercase text-white hover:bg-primary hover:text-slate-950 hover:border-primary transition-all duration-300 shadow-2xl"
          >
            Show All Mentors
          </button>
        </div>
      )}
    </>
  );
}

