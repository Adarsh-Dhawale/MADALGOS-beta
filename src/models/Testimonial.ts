import mongoose, { Schema, model, models } from "mongoose";

export interface TestimonialDocument {
  name: string;
  role: string;
  content: string;
  imageUrl: string | null;
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "PENDING_REVIEW", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    rejectionReason: { type: String, default: null },
  },
  { collection: "testimonials", timestamps: true }
);

const TestimonialModel =
  (models.Testimonial as mongoose.Model<TestimonialDocument>) ||
  model<TestimonialDocument>("Testimonial", TestimonialSchema);

export default TestimonialModel;

