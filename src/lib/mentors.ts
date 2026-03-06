import { connectDB } from "./mongodb";
import MentorModel from "@/models/Mentor";

export interface CareerCompany {
  role: string;
  startTime: string;
  endTime: string;
  companyName: string;
}

export interface CareerHistory {
  currentCompany?: CareerCompany | null;
  previousCompanies?: CareerCompany[] | null;
}

export interface MentorFeedback {
  id: number;
  mentorId: number;
  rating: number;
  review: string | null;
  userId: number;
  dateTime: string;
}

export interface InterviewerDetails {
  firstName: string;
  lastName: string | null;
  dispImageLink: string | null;
}

export interface Mentor {
  id: number;
  interviewerId: number;
  linkedin: string | null;
  location: string | null;
  description: string | null;
  quote: string | null;
  careerHistory?: CareerHistory | null;
  skills?: string[] | null;
  expYears: number;
  currentNumberOfMentees: number;
  maxNumberOfMentees: number;
  joiningDate: string;
  isActive: boolean;
  PSCharges: number | null;
  MockCharges: number | null;
  profileId: string;
  isVerified: boolean;
  posterLink: string | null;
  approvalStatus: string;
  maxFreeTrails: number | null;
  mentorFeedback?: MentorFeedback[] | null;
  interviewer?: InterviewerDetails | null;
}

export async function getAllMentors(): Promise<Mentor[]> {
  await connectDB();
  const docs = await MentorModel.find({
    isActive: true,
    approvalStatus: "APPROVED",
  })
    .sort({ joiningDate: -1 })
    .lean<Mentor>()
    .exec();
  return docs;
}

export async function getMentorById(id: number): Promise<Mentor | null> {
  await connectDB();
  const doc = await MentorModel.findOne({ id }).lean<Mentor>().exec();
  return doc;
}

export function getMentorDisplayName(mentor: Mentor): string {
  const i = mentor.interviewer;
  if (!i) return mentor.profileId?.replace(/_/g, " ") || "Mentor";
  const parts = [i.firstName, i.lastName].filter(Boolean);
  return parts.length ? parts.join(" ") : "Mentor";
}

export function getMentorHeadline(mentor: Mentor): string {
  const current = mentor.careerHistory?.currentCompany;
  if (!current?.role && !current?.companyName) return "Mentor";
  if (current.role && current.companyName) return `${current.role} at ${current.companyName}`;
  return current.role || current.companyName || "Mentor";
}

export function getMentorCompaniesLine(mentor: Mentor): string {
  const current = mentor.careerHistory?.currentCompany?.companyName;
  const prev = mentor.careerHistory?.previousCompanies
    ?.map((c) => c.companyName)
    .filter(Boolean);
  const uniq = [current, ...(prev ?? [])].filter(Boolean) as string[];
  return uniq.slice(0, 3).join(" | ");
}

export function getMentorRating(mentor: Mentor): {
  avg: number;
  count: number;
} {
  const feedback = mentor.mentorFeedback ?? [];
  if (!feedback.length) return { avg: 0, count: 0 };
  const sum = feedback.reduce((acc, f) => acc + (Number(f.rating) || 0), 0);
  const avg = sum / feedback.length;
  return { avg, count: feedback.length };
}

export function formatMentorJoinedDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}

