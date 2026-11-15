import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  category: "fullstack" | "frontend" | "backend" | "mobile" | "other";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: String,
    techStack: [{ type: String }],
    imageUrl: { type: String, required: true },
    images: [{ type: String }],
    liveUrl: String,
    githubUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["fullstack", "frontend", "backend", "mobile", "other"],
      default: "fullstack",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
