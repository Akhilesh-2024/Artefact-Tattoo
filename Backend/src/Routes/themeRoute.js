import express from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";

const themeRouter = express.Router();

// Get current theme colors
themeRouter.get("/", getTheme);

// Update theme colors
themeRouter.put("/", updateTheme);

export default themeRouter;