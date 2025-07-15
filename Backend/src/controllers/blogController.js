import { blog } from "../models/blogModel.js";
import fs from "fs";
import path from "path";

export const blogGet = async (req, res) => {
  try {
    const blogs = await blog.find().sort({ date: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blogPost = async (req, res) => {
  try {
    const { title, subtitle, content, tag, category } = req.body;
    const imagePath = req.file ? `/upload/blog/${req.file.filename}` : "";

    const newBlog = new blog({
      title,
      subtitle,
      content,
      tag,
      category,
      img: imagePath,
    });

    await newBlog.save();
    res.status(200).json({ message: "Blog post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blogDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (existingBlog.img) {
      const fullPath = path.join(process.cwd(), "src", existingBlog.img);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog post and image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blogEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, tag, category } = req.body;

    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    let updatedImagePath = existingBlog.img;
    if (req.file) {
      if (existingBlog.img) {
        const oldImagePath = path.join(process.cwd(), "src", existingBlog.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedImagePath = `/upload/blog/${req.file.filename}`;
    }

    existingBlog.title = title;
    existingBlog.subtitle = subtitle;
    existingBlog.content = content;
    existingBlog.tag = tag;
    existingBlog.category = category;
    existingBlog.img = updatedImagePath;

    await existingBlog.save();
    res.status(200).json({ message: "Blog post updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
