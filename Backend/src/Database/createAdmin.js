import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { admin } from "../models/adminModel.js";

dotenv.config();

export const updateAdminSchema = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const existingAdmin = await admin.findOne({ username: process.env.EMAIL_ADDRESS });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      await existingAdmin.save();
    } else {
      const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);
      const newAdmin = new admin({
        username: process.env.EMAIL_ADDRES,
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
