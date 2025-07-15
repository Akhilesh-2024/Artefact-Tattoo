import express from "express";
import {
  getAllAppointments,
  createAppointment,
  deleteAppointment, // ✅ add this
} from "../controllers/appointmentBooking.js";

const appointmentBookingRouter = express.Router();

// GET all appointments (admin view)
appointmentBookingRouter.get("/", getAllAppointments);

// POST new booking
appointmentBookingRouter.post("/", createAppointment);

// DELETE appointment by ID
appointmentBookingRouter.delete("/:id", deleteAppointment); // ✅ new route

export default appointmentBookingRouter;
