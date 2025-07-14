import express from "express";
import { getMulterUploader } from "../config/multer.js";
import {
  getPricing,
  updatePricing,
  deletePricingItem
} from "../controllers/pricing.js";

const pricingRouter = express.Router();
const upload = getMulterUploader("pricing");

// GET the pricing section (includes background image + pricing items)
pricingRouter.get("/", getPricing);

// PUT update pricing section (update background image and/or pricing list)
pricingRouter.put("/", upload.single("img"), updatePricing);

// DELETE a single pricing item from the items array
pricingRouter.delete("/item/:itemId", deletePricingItem);

export default pricingRouter;
