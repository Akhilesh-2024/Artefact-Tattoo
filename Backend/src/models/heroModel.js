import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  headingLine1: { type: String, required: true },
  headingLine2: { type: String, required: true },
  subheading: { type: String, required: true },
  buttonText: { type: String },
  buttonLink: { type: String },
  background: { type: String },
});

export const Hero = mongoose.model("Hero", heroSchema);
