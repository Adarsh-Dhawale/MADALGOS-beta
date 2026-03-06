"use client";

import React from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import BlogsSection from "@/components/sections/blogs-section";

const BlogsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased font-sans selection:bg-primary/30">
      <Header />
      <main className="pt-28 md:pt-32">
        <BlogsSection />
      </main>
      <Footer />
    </div>
  );
};

export default BlogsPage;

