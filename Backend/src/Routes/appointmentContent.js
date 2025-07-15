import express from "express";
import {
  getAppointmentContent,
  createOrUpdateAppointmentContent,
} from "../controllers/appontmentContentController.js";
import { getMulterUploader } from "../config/multer.js";

const appointmentContentRouter = express.Router();
const upload = getMulterUploader("appointment");

// GET current content
appointmentContentRouter.get("/", getAppointmentContent);

// POST (create or update content)
appointmentContentRouter.post("/", upload.single("backgroundImage"), createOrUpdateAppointmentContent);

export default appointmentContentRouter;
