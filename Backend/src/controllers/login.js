import bcrypt from "bcrypt";
import { admin } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const newAdmin = await admin.findOne({ username });
    if (!newAdmin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, newAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: newAdmin._id,
      username: newAdmin.username,
      role: "admin"
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: newAdmin._id,
        username: newAdmin.username,
        role: "admin"
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
