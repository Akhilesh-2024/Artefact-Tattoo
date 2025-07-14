import express from "express";
import { getNavbar, saveOrUpdateNavbar } from "../controllers/navbarController.js";
import { getMulterUploader } from "../config/multer.js";

const upload = getMulterUploader("navbar");
const navbarRouter = express.Router();

navbarRouter.get("/", getNavbar);
navbarRouter.post("/", upload.single("logo"), saveOrUpdateNavbar);
navbarRouter.put("/", upload.single("logo"), saveOrUpdateNavbar);

export default navbarRouter;
