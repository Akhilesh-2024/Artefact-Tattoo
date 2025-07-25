import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { admin } from "../models/adminModel.js";

dotenv.config();

const updateAdminSchema = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const existingAdmin = await admin.findOne({ username: "admin@gmail.com" });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      await existingAdmin.save();
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const newAdmin = new admin({
        username: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      await newAdmin.save();
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

updateAdminSchema();
