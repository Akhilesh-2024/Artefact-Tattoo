import express from "express";
import { getGalleryItems, postGalleryItem, deleteGalleryItem, updateGalleryOrder } from "../controllers/GalleryController.js";
import { getMulterUploader } from "../config/multer.js";

const galleryRouter = express.Router();
const upload = getMulterUploader("gallery");

galleryRouter.get("/", getGalleryItems);
galleryRouter.post("/", upload.single("image"), postGalleryItem);
galleryRouter.delete("/:id", deleteGalleryItem);
galleryRouter.put("/order", updateGalleryOrder);

export default galleryRouter;