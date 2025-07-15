import express from "express";
import { addSubscriber, getSubscribers, deleteSubscriber } from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/", getSubscribers); // new route to get all subscribers
subscriberRouter.post("/", addSubscriber);
subscriberRouter.delete("/:id", deleteSubscriber);

export default subscriberRouter;