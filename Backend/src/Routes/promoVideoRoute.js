import express from "express";
import { getPromoVideo, postPromoVideo } from "../controllers/promoVideoController.js";
import { getMulterUploader } from "../config/multer.js";

const promoVideoRouter = express.Router();
const upload = getMulterUploader("promo");

promoVideoRouter.get("/", getPromoVideo);
promoVideoRouter.post("/", upload.single("background"), postPromoVideo);

export default promoVideoRouter;
