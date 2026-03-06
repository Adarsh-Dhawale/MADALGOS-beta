import mongoose, { Schema, model, models } from "mongoose";

export interface BlogAuthorDetails {
  firstName: string;
  lastName: string | null;
  dispImageLink: string | null;
}

export interface BlogDocument {
  id: number;
  title: string;
  publisher: string;
  bannerImageLink: string | null;
  descriptionId: string;
  partitionKey: string;
  publishDate: string;
  authorId: number;
  reviewStatus: string;
  likes: number;
  reviewer: string;
  reviewDate: string;
  descriptionDetails: string;
  authorDetails?: BlogAuthorDetails | null;
}

const BlogSchema = new Schema<BlogDocument>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    publisher: { type: String, default: "MadAlgos" },
    bannerImageLink: { type: String, default: null },
    descriptionId: { type: String, required: true },
    partitionKey: { type: String, default: "0" },
    publishDate: { type: String, required: true },
    authorId: { type: Number, required: true },
    reviewStatus: { type: String, default: "APPROVED" },
    likes: { type: Number, default: 0 },
    reviewer: { type: String, default: "" },
    reviewDate: { type: String, default: "" },
    descriptionDetails: { type: String, required: true },
    authorDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, default: null },
      dispImageLink: { type: String, default: null },
    },
  },
  {
    collection: "blogs",
  }
);

const BlogModel =
  (models.Blog as mongoose.Model<BlogDocument>) ||
  model<BlogDocument>("Blog", BlogSchema);

export default BlogModel;

