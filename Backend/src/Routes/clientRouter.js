import express from "express";
import {
  getClients,
  postClient,
  deleteClient,
  updateClient
} from "../controllers/clientController.js";
import { getMulterUploader } from "../config/multer.js";

const clientRouter = express.Router();
const upload = getMulterUploader("clients");

clientRouter.get("/", getClients);
clientRouter.post("/", upload.single("img"), postClient);
clientRouter.delete("/:id", deleteClient);
clientRouter.put("/:id", upload.single("img"), updateClient);

export default clientRouter;