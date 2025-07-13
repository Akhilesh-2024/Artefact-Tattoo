import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  established: {
    type: String,
    default: "Established 1985", // now editable
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: null,
  },
  points: {
    type: [String],
    default: [
      "Comfortable and relaxing environment",
      "Experienced artist input on your tattoo",
      "Top of the line cleaning and safety protocols",
      "Full aftercare instructions for a well-healed tattoo"
    ],
  },
});

export const About = mongoose.model("About", aboutSchema);
