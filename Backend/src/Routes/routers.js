import express from "express";
import adminRouter from "./adminRoute.js";
import teamRouter from "./teamRoute.js";
import heroRouter from "./heroRoutes.js";
import aboutRouter from "./aboutRoute.js";
import navbarRouter from "./navbarRoutes.js";
import processRouter from "./processRoute.js";

const router = express.Router();

router.use('/admin',adminRouter);
router.use('/team',teamRouter);
router.use('/hero',heroRouter);
router.use('/about',aboutRouter);
router.use('/navbar',navbarRouter);
router.use('/process',processRouter);

export default router;