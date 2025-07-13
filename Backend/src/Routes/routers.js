import express from "express";
import adminRouter from "./adminRoute.js";
import teamRouter from "./teamRoute.js";
import heroRouter from "./heroRoutes.js";
import aboutRouter from "./aboutRoute.js";

const router = express.Router();

router.use('/admin',adminRouter);
router.use('/team',teamRouter);
router.use('/hero',heroRouter);
router.use('/about',aboutRouter);

export default router;