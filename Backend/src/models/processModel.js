import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  stepNumber: Number,
  title: String,
  description: String,
});

const processSchema = new mongoose.Schema({
  subtitle: String,
  title: String,
  description: String,
  highlights: [String],
  steps: [stepSchema],
});

const Process = mongoose.model("Process", processSchema);

export default Process;