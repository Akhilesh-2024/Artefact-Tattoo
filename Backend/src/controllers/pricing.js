import { Pricing } from "../models/priceModel.js";
import fs from "fs";
import path from "path";

// GET pricing section
export const getPricing = async (req, res) => {
  try {
    let pricing = await Pricing.findOne();
    if (!pricing) {
      pricing = await Pricing.create({ img: "", items: [] });
    }
    res.status(200).json(pricing);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch pricing section." });
  }
};

// POST/PUT pricing section data (update background image)
export const updatePricing = async (req, res) => {
  try {
    let pricing = await Pricing.findOne();
    if (!pricing) {
      pricing = new Pricing();
    }

    // Delete old image if new one provided
    if (req.file) {
      if (pricing.img) {
        const oldPath = path.join(process.cwd(), "src", pricing.img);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      pricing.img = `/upload/pricing/${req.file.filename}`;
    }

    // Optional title/price updates via items
    if (req.body.items) {
      pricing.items = JSON.parse(req.body.items); // Expect array of { title, price }
    }

    await pricing.save();
    res.status(200).json({ message: "Pricing section updated successfully", pricing });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update pricing section." });
  }
};

// DELETE one item from the pricing list
export const deletePricingItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const pricing = await Pricing.findOne();
    if (!pricing) return res.status(404).json({ message: "Pricing section not found." });

    pricing.items = pricing.items.filter(item => item._id.toString() !== itemId);
    await pricing.save();

    res.status(200).json({ message: "Pricing item removed." });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete pricing item." });
  }
};
