import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    studentName: String,
    company: String,
    role: String,
    package: Number,
    status: String,
    interviewDate: Date,
  },
  { timestamps: true }
);

const Placement = mongoose.model("Placement", placementSchema);

export default Placement;
