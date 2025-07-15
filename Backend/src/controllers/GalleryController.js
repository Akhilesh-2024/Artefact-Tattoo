import Gallery from "../models/GalleryModel.js";
import fs from "fs";
import path from "path";

// GET - Modified to handle separate ordering
export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find();
    res.status(200).json(items);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST - Modified to handle separate ordering
export const postGalleryItem = async (req, res) => {
  try {
    const { type, videoUrl, title } = req.body;

    if (!type || !req.file) return res.status(400).json({ message: "Type and image required" });

    const imageUrl = `/upload/gallery/${req.file.filename}`;
    if (type === "video" && !videoUrl) return res.status(400).json({ message: "Video URL required" });

    // Get last order values for both types
    const lastImage = await Gallery.findOne({ type: "image" }).sort({ imageOrder: -1 });
    const lastVideo = await Gallery.findOne({ type: "video" }).sort({ videoOrder: -1 });

    const item = new Gallery({
      type,
      imageUrl,
      videoUrl: type === "video" ? videoUrl : undefined,
      title,
      imageOrder: type === "image" ? (lastImage ? lastImage.imageOrder + 1 : 0) : 0,
      videoOrder: type === "video" ? (lastVideo ? lastVideo.videoOrder + 1 : 0) : 0,
    });

    await item.save();
    res.status(201).json({ message: "Gallery item created", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE - No changes needed
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });

    if (item.imageUrl) {
      const filePath = path.join(process.cwd(), "src", item.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT - Modified to handle separate ordering
export const updateGalleryOrder = async (req, res) => {
  try {
    const { items, itemType } = req.body; // Expects items array and itemType ("image" or "video")

    for (const { _id, order } of items) {
      if (itemType === "image") {
        await Gallery.findByIdAndUpdate(_id, { imageOrder: order });
      } else {
        await Gallery.findByIdAndUpdate(_id, { videoOrder: order });
      }
    }

    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    console.error("Order update error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};