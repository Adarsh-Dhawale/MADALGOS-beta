"use client";

import React from "react";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Advantages from "@/components/sections/advantages";
import Campuses from "@/components/sections/campuses";
import Specializations from "@/components/sections/specializations";
import Curriculum from "@/components/sections/curriculum";
import LearningBeyondClassroom from "@/components/sections/learning-beyond";
import AlumniSection from "@/components/sections/alumni";
import FacultySection from "@/components/sections/faculty";
import DifferentiationSection from "@/components/sections/differentiation";
import BlogsSection from "@/components/sections/blogs-section";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground antialiased font-sans selection:bg-primary/30">
      <Header />
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Best of Both Worlds / Earth */}
        <Advantages />

        {/* Section 3: Global Innovation Centers / Hubs */}
        <Campuses />

        {/* Section 4: Enterprise Protocols / Specializations */}
        <Specializations />

        {/* Following Content */}
        <div className="bg-background">
          <div className="space-y-0">
            <Curriculum />
            <LearningBeyondClassroom />
            <AlumniSection />
            <FacultySection />
            <DifferentiationSection />
            <BlogsSection />
            <Testimonials />
            <FAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
