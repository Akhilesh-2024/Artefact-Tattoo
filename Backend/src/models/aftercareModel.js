import mongoose from "mongoose";

const aftercareSchema = new mongoose.Schema({
  tattoo: {
    heading: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: null,
    },
    points: {
      type: [String],
      default: [
        "Following these tattoo aftercare instructions will help to ensure its vibrance and quality as it heals.",
        "Wash hands thoroughly prior to touching your tattoo for any reason.",
        "Pat dry with a clean cloth or towel.",
        "Apply a small amount of ointment to tattoo for the first 4 days.",
        "Continue this regiment until the tattoo is fully under the skin.",
        "For any questions, concerns, or continued care, reach out to us online, or walk-in to the shop.",
      ],
    },
  },
  piercing: {
    heading: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: null,
    },
    points: {
      type: [String],
      default: [
        "Wash your hands thoroughly prior to cleaning or touching your piercing for any reason.",
        "Using mild (fragrance-free, alcohol-free) soap, gently lather around the piercing.",
        "Rinse area thoroughly to remove all traces of soap from the piercing.",
        "Use saline rinse 2 times daily during healing on the front and back of your piercing.",
        "Refrain from unnecessary handling of the piercing.",
        "For any questions, concerns, or continued care, reach out to us online, or walk-in to the shop.",
        "When in doubt, wash and spray twice a day!",
      ],
    },
  },
});

export const Aftercare = mongoose.model("Aftercare", aftercareSchema);
