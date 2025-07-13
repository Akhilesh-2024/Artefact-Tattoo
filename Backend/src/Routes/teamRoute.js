import express from "express";
import multer from "multer";
import path from "path";
import { teamDelete, teamGet, teamPost } from "../controllers/team.js";

const teamRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/upload/team"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

teamRouter.get("/", teamGet);
teamRouter.post("/", upload.single("img"), teamPost);
teamRouter.delete("/:id", teamDelete);

export default teamRouter;