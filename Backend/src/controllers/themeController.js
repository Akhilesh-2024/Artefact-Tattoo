// controllers/themeController.js
import { Theme } from "../models/themeModel.js";

// GET current theme
export const getTheme = async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) {
      theme = new Theme();
      await theme.save();
    }
    res.status(200).json(theme);
  } catch (err) {
    console.error("Get Theme Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// PUT - Update theme colors
export const updateTheme = async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) {
      theme = new Theme(req.body);
    } else {
      Object.assign(theme, req.body);
    }
    await theme.save();
    res.status(200).json({ message: "Theme updated successfully", data: theme });
  } catch (err) {
    console.error("Update Theme Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
