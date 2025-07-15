import express from "express";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/FaqController.js";

const faqRouter = express.Router();

faqRouter.get("/", getFaqs);
faqRouter.post("/", createFaq);
faqRouter.put("/:id", updateFaq);
faqRouter.delete("/:id", deleteFaq);

export default faqRouter;
