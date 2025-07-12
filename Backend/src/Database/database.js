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

const teamSchema = new mongoose.Schema({
    img: String,
    name: String,
    subname: String,
    info: String,
})

export const admin = mongoose.model("admin",adminSchema);
export const team = mongoose.model("team",teamSchema);