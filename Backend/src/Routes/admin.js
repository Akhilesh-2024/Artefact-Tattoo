import express from "express";
import { login } from "../Controller/login.js";
import { auth } from "../Middleware/auth.js";
import multer from "multer";
import path from "path";
import {teamDelete, teamGet, teamPost} from "../Controller/team.js";

const router = express.Router();

// Public routes
router.post('/admin/login', login);

// Protected route to verify admin access
router.get('/admin/verify', auth, (req, res) => {
  console.log("Admin verification successful for user:", req.user);
  
  res.status(200).json({ 
    message: "Token is valid", 
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

// Team

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/upload/team");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get('/team',teamGet);
router.post('/team',upload.single("img"),teamPost);
router.delete('/team/:id',teamDelete)

export default router;