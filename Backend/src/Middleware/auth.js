import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export const auth = (req, res, next) => {
  try {
    console.log("Auth middleware checking token");
    
    // Get token from header
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    
    console.log("Token received:", token ? "exists" : "missing");
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    
    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Token is not valid" });
      }
      
      console.log("Token verified, user:", decoded);
      
      // Add user from payload to request
      req.user = decoded;
      
      // Check if user is admin
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};