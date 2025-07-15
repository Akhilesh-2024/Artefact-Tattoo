import express from "express";
import {
  getContactContent,
  updateContactContent,
  submitContactForm,
  getAllContactForms,
  deleteContactForm,
} from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.get("/content", getContactContent);
contactRouter.put("/content", updateContactContent);

contactRouter.post("/submit", submitContactForm);
contactRouter.get("/messages", getAllContactForms);
contactRouter.delete("/messages/:id", deleteContactForm);

export default contactRouter;
