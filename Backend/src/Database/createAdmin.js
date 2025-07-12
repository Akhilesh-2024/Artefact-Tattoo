import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { admin } from "./database.js";

dotenv.config();

// Update the admin schema to include role
const updateAdminSchema = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
    
    // Check if admin exists
    const existingAdmin = await admin.findOne({ username: "admin@gmail.com" });
    
    if (existingAdmin) {
      console.log("Admin already exists, updating role...");
      
      // Update the existing admin to include role
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("Admin role updated");
    } else {
      console.log("Creating new admin...");
      
      // Create a new admin with role
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      const newAdmin = new admin({
        username: "admin@gmail.com",
        password: hashedPassword,
        role: "admin"
      });
      
      await newAdmin.save();
      console.log("Admin created with role");
    }
    
    mongoose.disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

updateAdminSchema();
