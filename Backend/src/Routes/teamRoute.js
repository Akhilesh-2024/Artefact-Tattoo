import express from "express";
import { getMulterUploader } from "../config/multer.js";
import { teamDelete, teamGet, teamPost, teamEdit } from "../controllers/team.js";

const teamRouter = express.Router();

const upload = getMulterUploader("team");

teamRouter.get("/", teamGet);
teamRouter.post("/", upload.single("img"), teamPost);
teamRouter.delete("/:id", teamDelete);
teamRouter.put('/:id', upload.single("img"), teamEdit);

export default teamRouter;