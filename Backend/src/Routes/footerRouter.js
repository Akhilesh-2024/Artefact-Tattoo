import express from "express";
import {
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
  patchFooter,
} from "../controllers/footerController.js";

const footerRouter = express.Router();

footerRouter.get("/", getFooter);
footerRouter.post("/", createFooter);
footerRouter.put("/:id", updateFooter);
footerRouter.delete("/:id", deleteFooter);
footerRouter.patch("/", patchFooter); // update partial fields like socialLinks or workHours

export default footerRouter;
