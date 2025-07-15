import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  message: String,
  img: String,
});

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
