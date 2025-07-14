import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  img: String,
  title: String,
  description: String,
  order: Number
});

export const Service = mongoose.model("Service", serviceSchema);