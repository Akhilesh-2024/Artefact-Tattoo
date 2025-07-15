import express from "express";
import {
  getTestimonials,
  postTestimonial,
  deleteTestimonial,
  updateTestimonial
} from "../controllers/testimonialController.js";
import { getMulterUploader } from "../config/multer.js";

const testimonialRouter = express.Router();
const upload = getMulterUploader("testimonials");

testimonialRouter.get("/", getTestimonials);
testimonialRouter.post("/", upload.single("img"), postTestimonial);
testimonialRouter.delete("/:id", deleteTestimonial);
testimonialRouter.put("/:id", upload.single("img"), updateTestimonial);

export default testimonialRouter;
