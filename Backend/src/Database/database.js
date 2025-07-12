import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "admin"
  }
});

export const admin = mongoose.model("admin",adminSchema);
