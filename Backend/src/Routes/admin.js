import express from "express";
import { login } from "../Controller/login.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

// Public routes
router.post('/admin/login', login);

// Protected route to verify admin access
router.get('/admin/verify', auth, (req, res) => {
  console.log("Admin verification successful for user:", req.user);
  
  res.status(200).json({ 
    message: "Token is valid", 
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

export default router;