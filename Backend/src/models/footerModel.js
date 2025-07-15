import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  address: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  socialLinks: {
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
  },
  workHours: [
    {
      day: { type: String },
      time: { type: String }, // e.g. "10:00 - 20:00" or "Closed"
    },
  ],
  subscribeText: { type: String }, // Text above the input field
});

export default mongoose.model("Footer", footerSchema);
