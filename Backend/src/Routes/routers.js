import express from "express";
import adminRouter from "./adminRoute.js";
import teamRouter from "./teamRoute.js";

const router = express.Router();

router.use('/admin',adminRouter);
router.use('/team',teamRouter);

export default router;