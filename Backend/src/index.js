import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./Database/database.js";
import router from "./Routes/routers.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "upload")));
connectDB();

const port = process.env.PORT;

app.use("/api/tatto", router);

app.listen(port, () => {
  console.log("Backend Running on port :",port);
})