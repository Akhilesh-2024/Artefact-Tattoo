import express from "express";
import { login } from "../controllers/login.js";
import { auth } from "../Middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);

adminRouter.get("/verify", auth, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    },
  });
});

export default adminRouter;