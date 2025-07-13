import { About } from "../models/aboutModel.js";
import fs from "fs";
import path from "path";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(200).json({
        established: "",
        title: "",
        subTitle: "",
        description: "",
        img: null,
        points: []
      });
    }

    res.status(200).json(about);
  } catch (err) {
    console.error("Get About Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const saveOrUpdateAbout = async (req, res) => {
  try {
    const { established, title, subTitle, description, points } = req.body;

    if (!established || !title || !subTitle || !description) {
      return res.status(400).json({ message: "Established, Title, SubTitle, and Description are required." });
    }

    let about = await About.findOne();

    const parsedPoints = points
      ? Array.isArray(points)
        ? points
        : JSON.parse(points)
      : undefined;

    if (!about) {
      // Create new
      about = new About({
        established,
        title,
        subTitle,
        description,
        points: parsedPoints || undefined,
        img: req.file ? `/upload/about/${req.file.filename}` : null,
      });
    } else {
      // Update existing
      about.established = established;
      about.title = title;
      about.subTitle = subTitle;
      about.description = description;
      if (parsedPoints) about.points = parsedPoints;

      if (req.file) {
        if (about.img) {
          const oldFile = about.img.split("/").pop();
          const paths = [
            path.join(process.cwd(), "src", "Upload", "about", oldFile),
            path.join(process.cwd(), "src", "upload", "about", oldFile),
          ];
          paths.forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
        }
        about.img = `/upload/about/${req.file.filename}`;
      }
    }

    await about.save();
    res.status(200).json({ message: "About section saved successfully", about });
  } catch (err) {
    console.error("SaveOrUpdate About Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
