import AppointmentBooking from "../models/appointmentsBooking.js";

// GET all appointment bookings (admin view)
export const getAllAppointments = async (req, res) => {
  try {
    const bookings = await AppointmentBooking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointment bookings." });
  }
};

// POST new appointment booking
export const createAppointment = async (req, res) => {
  try {
    const { name, phone, date, time, service, artist } = req.body;
    console.log("Received booking data:", req.body);

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!phone) missingFields.push("phone");
    if (!date) missingFields.push("date");
    if (!time) missingFields.push("time");
    if (!service) missingFields.push("service");
    if (!artist) missingFields.push("artist");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    const newBooking = new AppointmentBooking({
      name,
      phone,
      date: new Date(date), // ensure date is parsed correctly
      time,
      service,
      artist,
    });

    await newBooking.save();
    res.status(201).json({
      message: "Appointment booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      error: "Failed to create appointment.",
      details: error.message,
    });
  }
};

// DELETE appointment booking by ID
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await AppointmentBooking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment." });
  }
};

