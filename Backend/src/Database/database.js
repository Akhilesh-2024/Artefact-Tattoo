import mongoose from "mongoose";
import {updateAdminSchema} from "./createAdmin.js";

export const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await updateAdminSchema();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}