import mongoose from "mongoose";

const promoVideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  background: String, // image path
});

export const PromoVideo = mongoose.model("PromoVideo", promoVideoSchema);
