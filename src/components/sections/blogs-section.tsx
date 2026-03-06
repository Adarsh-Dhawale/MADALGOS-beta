"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Why Your MySQL Database Needs Redis?",
    author: "Ashish Dey",
    date: "Jun 14, 2023",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Explore a real-world command‑query setup where MySQL keeps your source of truth while Redis powers blazing‑fast reads, queues, and pub/sub for modern microservices.",
  },
  {
    id: 2,
    title: "Types of Linked List – ep02",
    author: "Mansha Srivastava",
    date: "May 29, 2023",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Singly, doubly, and circular lists explained with interview‑style diagrams, pointer flows, and when each structure shines in production code.",
  },
  {
    id: 3,
    title: "Microsoft Build 2023 and the Future of AI",
    author: "Ashish Dey",
    date: "May 24, 2023",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Key announcements from Build 2023: copilots everywhere, vector‑native databases, and how these shifts reshape the roadmap for enterprise engineering teams.",
  },
  {
    id: 4,
    title: "GraphQL and OData for System Design Interviews",
    author: "Ashish Dey",
    date: "Jul 16, 2023",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "A practical comparison of GraphQL and OData with patterns you can drop straight into system‑design rounds for flexible, evolvable APIs.",
  },
];

const BlogsSection = () => {
  return (
    <section className="bg-background py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl"
          >
            <Trophy className="w-4 h-4" />
            <span>Our Blogs</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter uppercase leading-none"
          >
            Industry-ready <span className="text-gradient-brand italic">Insights</span>
          </motion.h2>
        </div>

        {/* Horizontal blogs carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/70 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/70 to-transparent z-20" />

          <div className="overflow-hidden py-4">
            <div className="flex gap-8 animate-[marquee_55s_linear_infinite]">
              {[...blogs, ...blogs].map((blog, idx) => (
                <motion.article
                  key={`${blog.id}-${idx}`}
                  className="group bg-slate-950/30 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 md:p-8 flex flex-col min-w-[280px] md:min-w-[360px] max-w-[360px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-primary/40 hover:bg-slate-900/60"
                  whileHover={{ y: -6 }}
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold uppercase text-white/70">
                      {blog.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white/80 text-[11px] uppercase tracking-[0.18em]">
                        {blog.author}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{blog.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <button className="mt-auto inline-flex items-center text-[11px] font-bold uppercase tracking-[0.25em] text-primary hover:text-primary/80">
                    ...continue reading
                  </button>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.3em] uppercase text-white hover:bg-primary hover:text-slate-950 hover:border-primary transition-all duration-300 shadow-2xl"
            >
              View All Blogs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
