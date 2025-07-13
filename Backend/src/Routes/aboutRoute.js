import express from "express";
import { getAbout, saveOrUpdateAbout } from "../controllers/aboutDetails.js";
import { getMulterUploader } from "../config/multer.js";

const aboutRouter = express.Router();
const upload = getMulterUploader("about");

aboutRouter.get("/", getAbout);

aboutRouter.post("/", upload.single("img"), saveOrUpdateAbout);
aboutRouter.put("/", upload.single("img"), saveOrUpdateAbout);

export default aboutRouter;
