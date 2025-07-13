import express from "express";
import adminRouter from "./adminRoute.js";
import teamRouter from "./teamRoute.js";
import heroRouter from "./heroRoutes.js";

const router = express.Router();

router.use('/admin',adminRouter);
router.use('/team',teamRouter);
router.use('/hero',heroRouter);

export default router;