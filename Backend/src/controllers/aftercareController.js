import { Aftercare } from "../models/aftercareModel.js";
import fs from "fs";
import path from "path";

export const getAftercare = async (req, res) => {
  try {
    const data = await Aftercare.findOne();
    if (!data) {
      return res.status(200).json({
        tattoo: {
          heading: "",
          description: "",
          image: null,
          points: [],
        },
        piercing: {
          heading: "",
          description: "",
          image: null,
          points: [],
        },
      });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("Get Aftercare Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const saveOrUpdateAftercare = async (req, res) => {
  try {
    const {
      tattooHeading,
      tattooDescription,
      tattooPoints,
      piercingHeading,
      piercingDescription,
      piercingPoints,
    } = req.body;

    const parsedTattooPoints = tattooPoints
      ? Array.isArray(tattooPoints)
        ? tattooPoints
        : JSON.parse(tattooPoints)
      : [];

    const parsedPiercingPoints = piercingPoints
      ? Array.isArray(piercingPoints)
        ? piercingPoints
        : JSON.parse(piercingPoints)
      : [];

    let data = await Aftercare.findOne();

    const tattooImage = req.files?.tattooImage?.[0];
    const piercingImage = req.files?.piercingImage?.[0];

    if (!data) {
      // Create new
      data = new Aftercare({
        tattoo: {
          heading: tattooHeading || "",
          description: tattooDescription || "",
          image: tattooImage ? `/upload/aftercare/${tattooImage.filename}` : null,
          points: parsedTattooPoints,
        },
        piercing: {
          heading: piercingHeading || "",
          description: piercingDescription || "",
          image: piercingImage ? `/upload/aftercare/${piercingImage.filename}` : null,
          points: parsedPiercingPoints,
        },
      });
    } else {
      // Update existing
      if (tattooHeading !== undefined) data.tattoo.heading = tattooHeading;
      if (tattooDescription !== undefined) data.tattoo.description = tattooDescription;
      if (parsedTattooPoints) data.tattoo.points = parsedTattooPoints;

      if (tattooImage) {
        if (data.tattoo.image) {
          const oldFile = data.tattoo.image.split("/").pop();
          const paths = [
            path.join(process.cwd(), "src", "Upload", "aftercare", oldFile),
            path.join(process.cwd(), "src", "upload", "aftercare", oldFile),
          ];
          paths.forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
        }
        data.tattoo.image = `/upload/aftercare/${tattooImage.filename}`;
      }

      if (piercingHeading !== undefined) data.piercing.heading = piercingHeading;
      if (piercingDescription !== undefined) data.piercing.description = piercingDescription;
      if (parsedPiercingPoints) data.piercing.points = parsedPiercingPoints;

      if (piercingImage) {
        if (data.piercing.image) {
          const oldFile = data.piercing.image.split("/").pop();
          const paths = [
            path.join(process.cwd(), "src", "Upload", "aftercare", oldFile),
            path.join(process.cwd(), "src", "upload", "aftercare", oldFile),
          ];
          paths.forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
        }
        data.piercing.image = `/upload/aftercare/${piercingImage.filename}`;
      }
    }

    await data.save();
    res.status(200).json({ message: "Aftercare content saved successfully", data });
  } catch (err) {
    console.error("SaveOrUpdate Aftercare Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
