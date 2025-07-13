import { Hero } from "../models/heroModel.js";
import fs from "fs";
import path from "path";

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    
    res.status(200).json({
      background: hero.background,
      headingLine1: hero.headingLine1,
      headingLine2: hero.headingLine2,
      subheading: hero.subheading,
      buttonText: hero.buttonText,
      buttonLink: hero.buttonLink,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const saveOrUpdateHero = async (req, res) => {
  try {
    const { headingLine1, headingLine2, subheading, buttonText, buttonLink } = req.body;

    if (!headingLine1 || !headingLine2 || !subheading) {
      return res.status(400).json({ message: "Heading lines and Subheading are required." });
    }

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({
        headingLine1,
        headingLine2,
        subheading,
        buttonText: buttonText || "",
        buttonLink: buttonLink || "",
        background: req.file ? `/upload/hero/${req.file.filename}` : null,
      });
    } else {
      hero.headingLine1 = headingLine1;
      hero.headingLine2 = headingLine2;
      hero.subheading = subheading;
      hero.buttonText = buttonText || "";
      hero.buttonLink = buttonLink || "";

      if (req.file) {
        if (hero.background) {
          // Extract the filename from the path
          const filename = hero.background.split('/').pop();
          
          // Try both capitalized and lowercase paths
          const oldPathUpper = path.join(process.cwd(), "src", "Upload", "hero", filename);
          const oldPathLower = path.join(process.cwd(), "src", "upload", "hero", filename);
          
          // Delete the file if it exists in either location
          if (fs.existsSync(oldPathUpper)) fs.unlinkSync(oldPathUpper);
          if (fs.existsSync(oldPathLower)) fs.unlinkSync(oldPathLower);
        }
        hero.background = `/upload/hero/${req.file.filename}`;
      }
    }

    await hero.save();
    res.status(200).json({ message: "Hero saved or updated successfully", hero });
  } catch (err) {
    console.error("Save or update hero error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};