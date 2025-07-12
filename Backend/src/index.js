import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Database/database.js";
import adminRoutes from "./Routes/admin.js"

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();

const port = process.env.PORT;

app.use("/api/tatto", adminRoutes);

app.listen(port, () => {
  console.log("Backend Running on port :",port);
})