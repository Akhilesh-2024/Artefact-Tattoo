import { PromoVideo } from "../models/promoVideoModel.js";
import fs from "fs";
import path from "path";

export const getPromoVideo = async (req, res) => {
  try {
    const data = await PromoVideo.findOne(); // only one promo video
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch promo video" });
  }
};

export const postPromoVideo = async (req, res) => {
  try {
    const { title, url } = req.body;
    const background = req.file ? `/upload/promo/${req.file.filename}` : "";

    const existing = await PromoVideo.findOne();
    if (existing) {
      // Delete old image
      if (existing.background && req.file) {
        const oldPath = path.join(process.cwd(), "src", existing.background);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      existing.title = title;
      existing.url = url;
      if (req.file) {
        existing.background = background;
      }
      await existing.save();
      return res.status(200).json(existing); // Return the updated document
    }

    const newVideo = new PromoVideo({ title, url, background });
    await newVideo.save();
    res.status(200).json(newVideo); // Return the new document
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};