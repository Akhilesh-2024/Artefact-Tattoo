import express from "express";
import { getAllProcesses, createProcess, updateProcess, deleteProcess } from "../controllers/processController.js";

const processRouter = express.Router();

processRouter.get("/", getAllProcesses);
processRouter.post("/", createProcess);
processRouter.put("/:id", updateProcess);
processRouter.delete("/:id", deleteProcess); 

export default processRouter;
