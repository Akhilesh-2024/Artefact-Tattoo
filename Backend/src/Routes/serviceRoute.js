import express from "express";
import { getMulterUploader } from "../config/multer.js";
import {
  getServices,
  createService,
  updateService,
  deleteService
} from "../controllers/service.js";

const serviceRouter = express.Router();
const upload = getMulterUploader("service");

serviceRouter.get("/", getServices);
serviceRouter.post("/", upload.single("img"), createService);
serviceRouter.put("/:id", upload.single("img"), updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;
