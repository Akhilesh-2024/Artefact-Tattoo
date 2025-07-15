import express from "express";
import adminRouter from "./adminRoute.js";
import teamRouter from "./teamRoute.js";
import heroRouter from "./heroRoutes.js";
import aboutRouter from "./aboutRoute.js";
import navbarRouter from "./navbarRoutes.js";
import processRouter from "./processRoute.js";
import serviceRouter from "./serviceRoute.js";
import pricingRouter from "./priceRoute.js";
import appointmentContentRouter from "./appointmentContent.js";
import appointmentBookingRouter from "./appointmentBooking.js";
import blogRouter from "./blogRoute.js";
import promoVideoRouter from "./promoVideoRoute.js";
import testimonialRouter from "./testimonialRoute.js";
import clientRouter from "./clientRouter.js";
import footerRouter from "./footerRouter.js";
import subscriberRouter from "./subscriberRouter.js";

const router = express.Router();

router.use('/admin',adminRouter);
router.use('/team',teamRouter);
router.use('/hero',heroRouter);
router.use('/about',aboutRouter);
router.use('/navbar',navbarRouter);
router.use('/process',processRouter);
router.use('/service',serviceRouter);
router.use('/pricing',pricingRouter);
router.use('/appointment-content', appointmentContentRouter);
router.use('/appointment-booking', appointmentBookingRouter);
router.use('/blog', blogRouter);
router.use('/promo', promoVideoRouter);
router.use('/testimonials', testimonialRouter);
router.use('/clients', clientRouter);
router.use('/footer', footerRouter);
router.use('/subscribe', subscriberRouter);

export default router;