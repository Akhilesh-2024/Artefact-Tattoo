import mongoose from "mongoose";

const contactContentSchema = new mongoose.Schema({
  studioTitle: { type: String, required: true },       // ← e.g. "Artefact Tattoo Studio"
  description: { type: String, required: true },       // ← the paragraph below the title
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("ContactContent", contactContentSchema);
