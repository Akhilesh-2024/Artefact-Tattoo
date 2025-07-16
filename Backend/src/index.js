import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./Database/database.js";
import router from "./Routes/routers.js";
import axios from 'axios';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const SELF_URL = process.env.MY_URL;

setInterval(() => {
  axios.get(SELF_URL + '/ping')
    .then(() => console.log('Pinged self to stay awake'))
    .catch(err => console.error('Ping error:', err.message));
}, 10 * 60 * 1000); // Every 10 minutes

app.get('/ping', (req, res) => {
  res.send('Pong');
});

app.use(express.json());
// Serve files from both Upload and upload directories to handle case sensitivity
app.use("/upload", express.static(path.join(__dirname, "Upload")));
app.use("/upload", express.static(path.join(__dirname, "upload")));
// Also serve from /uploads path to handle plural form
app.use("/uploads", express.static(path.join(__dirname, "Upload")));
app.use("/uploads", express.static(path.join(__dirname, "upload")));
connectDB();

const port = process.env.PORT;

app.use("/api/tatto", router);

app.listen(port, () => {
  console.log("Backend Running on port :",port);
})