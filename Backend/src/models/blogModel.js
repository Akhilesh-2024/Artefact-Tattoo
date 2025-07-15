import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  date: { type: Date, default: Date.now },
  img: String,
  tag: String,
  category: String,
});

export const blog = mongoose.model("blog", blogSchema);
