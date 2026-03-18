import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ThumbsUp,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import {
  getAllBlogs,
  formatBlogDate,
  getAuthorDisplayName,
  getPlainTextExcerpt,
} from "@/lib/blogs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Blogs | MADAlgos",
  description:
    "Deep-dive blogs from MADAlgos mentors on system design, DSA, AI, careers and more.",
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  const mostRecent = blogs.slice(0, 3);
  const mostLiked = [...blogs].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased font-sans selection:bg-primary/30">
      <Header />
      <main className="pt-28 md:pt-32 pb-20 px-4 md:px-6">
        <section className="max-w-6xl mx-auto space-y-10">
          <header className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
              <BookOpen className="h-3 w-3" />
              Blog Space
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Industry-ready <span className="text-gradient-brand italic">Insights</span>{" "}
              from MADAlgos mentors.
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
              Long-form breakdowns on system design, data structures,
              interviews, and the latest in AI &amp; cloud — written by working
              engineers.
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-[2.2fr,1fr]">
            {/* Main blog feed */}
            <div className="space-y-6">
              {blogs.map((blog) => {
                const author = getAuthorDisplayName(blog);
                const date = formatBlogDate(blog.publishDate);
                const excerpt = getPlainTextExcerpt(blog.descriptionDetails);

                return (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.id}`}
                    className="group flex flex-col gap-5 rounded-3xl border border-white/5 bg-slate-950/40 p-5 md:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-primary/40 hover:bg-slate-900/70 hover:-translate-y-1"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="relative w-full md:w-64 h-40 rounded-2xl overflow-hidden bg-slate-900/70">
                        {blog.bannerImageLink ? (
                          <Image
                            src={blog.bannerImageLink}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                          <span className="rounded-full bg-white/5 px-3 py-1 text-white/80">
                            {author}
                          </span>
                          {date && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {date}
                            </span>
                          )}
                          {blog.likes > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {blog.likes} likes
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug group-hover:text-primary transition-colors">
                          {blog.title}
                        </h2>

                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>

                        <div className="mt-2 inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.26em] text-primary group-hover:text-primary/80">
                          Read full article
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right rail */}
            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-5 md:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4">
                  Most Recent
                </h3>
                <div className="space-y-4">
                  {mostRecent.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.id}`}
                      className="group flex gap-3 rounded-2xl bg-white/5 p-3 hover:bg-primary/10 transition-colors"
                    >
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-slate-900/80">
                        {blog.bannerImageLink && (
                          <Image
                            src={blog.bannerImageLink}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-white line-clamp-2 group-hover:text-primary">
                          {blog.title}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {formatBlogDate(blog.publishDate)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-5 md:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4">
                  Most Loved
                </h3>
                <div className="space-y-3">
                  {mostLiked.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.id}`}
                      className="group flex items-center justify-between rounded-2xl px-3 py-2 hover:bg-white/5 transition-colors"
                    >
                      <div className="mr-3 flex-1">
                        <p className="text-xs font-semibold text-white line-clamp-1 group-hover:text-primary">
                          {blog.title}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {getAuthorDisplayName(blog)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        {blog.likes}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-slate-950 to-slate-950 p-5 md:p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-3">
                  Explore Topics
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  System Design, DSA, Backend, Cloud, AI and real interview
                  stories from MADAlgos mentors.
                </p>
                <ul className="space-y-2 text-xs">
                  {[
                    "System Design & Architecture",
                    "Data Structures & Algorithms",
                    "Backend & Databases",
                    "Cloud & DevOps",
                    "Career & Interview Prep",
                  ].map((topic) => (
                    <li
                      key={topic}
                      className="flex items-center justify-between rounded-full bg-white/5 px-3 py-2 text-[11px] text-white/80"
                    >
                      <span>{topic}</span>
                      <ChevronRight className="h-3 w-3 text-primary/80" />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

