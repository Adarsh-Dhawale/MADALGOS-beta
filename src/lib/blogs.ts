import { connectDB } from "./mongodb";
import BlogModel, { type BlogAuthorDetails, type BlogDocument } from "@/models/Blog";

export type AuthorDetails = BlogAuthorDetails;
export type Blog = BlogDocument;

export async function getAllBlogs(): Promise<Blog[]> {
  await connectDB();
  const docs = await BlogModel.find({
    $or: [{ status: "PUBLISHED" }, { status: { $exists: false } }],
  })
    .sort({ publishDate: -1 })
    .lean<BlogDocument[]>()
    .exec();
  return docs;
}

export async function getBlogById(id: number): Promise<Blog | null> {
  await connectDB();
  const doc = await BlogModel.findOne({
    id,
    $or: [{ status: "PUBLISHED" }, { status: { $exists: false } }],
  }).lean<BlogDocument | null>().exec();
  return doc;
}

export function formatBlogDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getAuthorDisplayName(blog: Blog): string {
  const details = blog.authorDetails;
  if (!details) return "MadAlgos";
  const parts = [details.firstName, details.lastName].filter(Boolean);
  return parts.length ? parts.join(" ") : "MadAlgos";
}

export function getPlainTextExcerpt(
  html: string,
  maxLength: number = 180
): string {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}


