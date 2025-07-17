import { Testimonial } from "../models/testimonialModel.js";
import fs from "fs";
import path from "path";

export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

export const postTestimonial = async (req, res) => {
  try {
    const { name, role, message } = req.body;
    const img = req.file ? `/Upload/testimonials/${req.file.filename}` : "";

    const newTestimonial = new Testimonial({ name, role, message, img });
    await newTestimonial.save();
    res.status(200).json({ message: "Testimonial added" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Testimonial.findById(id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    if (existing.img) {
      const fullPath = path.join(process.cwd(), "src", existing.img);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, message } = req.body;
    const existing = await Testimonial.findById(id);

    if (!existing) return res.status(404).json({ message: "Not found" });

    // Delete old image if new one is uploaded
    if (req.file && existing.img) {
      const oldPath = path.join(process.cwd(), "src", existing.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const img = req.file ? `/Upload/testimonials/${req.file.filename}` : existing.img;

    existing.name = name;
    existing.role = role;
    existing.message = message;
    existing.img = img;

    await existing.save();
    res.status(200).json({ message: "Testimonial updated" });
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

