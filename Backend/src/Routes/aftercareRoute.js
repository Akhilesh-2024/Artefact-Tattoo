import express from "express";
import { getAftercare, saveOrUpdateAftercare } from "../controllers/aftercareController.js";
import { getMulterUploader } from "../config/multer.js";

const aftercareRouter = express.Router();
const upload = getMulterUploader("aftercare");

// Accepts two files: tattooImage and piercingImage
aftercareRouter.get("/", getAftercare);

aftercareRouter.post(
  "/",
  upload.fields([
    { name: "tattooImage", maxCount: 1 },
    { name: "piercingImage", maxCount: 1 },
  ]),
  saveOrUpdateAftercare
);

aftercareRouter.put(
  "/",
  upload.fields([
    { name: "tattooImage", maxCount: 1 },
    { name: "piercingImage", maxCount: 1 },
  ]),
  saveOrUpdateAftercare
);

export default aftercareRouter;