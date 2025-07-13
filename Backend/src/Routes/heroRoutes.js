import express from "express";
import { getHero, saveOrUpdateHero } from "../controllers/heroController.js";
import { getMulterUploader } from "../config/multer.js";

const heroRouter = express.Router();

const upload = getMulterUploader("hero");

heroRouter.get("/", getHero);
heroRouter.put("/", upload.single("background"), saveOrUpdateHero);
heroRouter.post("/", upload.single("background"), saveOrUpdateHero);

export default heroRouter;
