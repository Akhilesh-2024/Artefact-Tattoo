import mongoose from "mongoose";

const pricingItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

const pricingSchema = new mongoose.Schema({
  img: { type: String }, // Section background image
  items: [pricingItemSchema], // Pricing items list
});

export const Pricing = mongoose.model("Pricing", pricingSchema);
