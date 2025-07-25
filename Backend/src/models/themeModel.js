// models/themeModel.js
import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  primaryColor: { type: String, default: "#904d30" },
  secondaryColor: { type: String, default: "#101010" },
  darkColor: { type: String, default: "#000000" },
  whiteColor: { type: String, default: "#ffffff" },
  textColor: { type: String, default: "#ffffff" },
  textMuted: { type: String, default: "#999999" },
  textLight: { type: String, default: "#f7f7f7" },
  borderColor: { type: String, default: "rgba(255, 255, 255, 0.1)" },
  borderDark: { type: String, default: "#222222" },
  overlayDark: { type: String, default: "rgba(0, 0, 0, 0.1)" },
  bgSuccess: { type: String, default: "#28a745" },
  bgDanger: { type: String, default: "#dc3545" },

  // Additional RGBA border colors
  borderColorLight: { type: String, default: "rgba(255, 255, 255, 0.02)" },
  borderColorMedium: { type: String, default: "rgba(255, 255, 255, 0.25)" },
  borderColorStrong: { type: String, default: "rgba(255, 255, 255, 0.3)" },
  borderColorBold: { type: String, default: "rgba(255, 255, 255, 0.5)" },
  borderColorSubtle: { type: String, default: "rgba(255, 255, 255, 0.05)" },
  borderColorFaint: { type: String, default: "rgba(255, 255, 255, 0.03)" },
  borderColorMedium2: { type: String, default: "rgba(255, 255, 255, 0.2)" },
});

export const Theme = mongoose.model("Theme", themeSchema);
