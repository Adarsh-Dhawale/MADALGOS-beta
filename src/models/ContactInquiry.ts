import mongoose, { Schema, model, models } from "mongoose";

export interface IContactInquiry {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  createdAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "Contact form" },
    message: { type: String, required: true },
    phone: { type: String },
    createdAt: { type: Date, default: () => new Date() },
  },
  { collection: "ContactInquiry" }
);

export default models.ContactInquiry ?? model<IContactInquiry>("ContactInquiry", ContactInquirySchema);
