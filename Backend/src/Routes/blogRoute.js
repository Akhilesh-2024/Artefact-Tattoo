import express from "express";
import { getMulterUploader } from "../config/multer.js";
import { blogGet, blogPost, blogDelete, blogEdit } from "../controllers/blogController.js";

const blogRouter = express.Router();
const upload = getMulterUploader("blog");

blogRouter.get("/", blogGet);
blogRouter.post("/", upload.single("img"), blogPost);
blogRouter.delete("/:id", blogDelete);
blogRouter.put("/:id", upload.single("img"), blogEdit);

export default blogRouter;