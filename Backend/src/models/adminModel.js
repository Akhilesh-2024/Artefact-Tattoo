import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "admin"
  }
});

export const admin = mongoose.model("admin",adminSchema);