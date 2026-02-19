import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  name: string;
  phone: string;
  company: string;
  website: string;
  budget: string;
  timestamp: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  website: { type: String, default: "" },
  budget: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);
