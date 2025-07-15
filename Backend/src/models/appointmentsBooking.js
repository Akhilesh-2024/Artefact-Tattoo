import mongoose from 'mongoose';

const appointmentBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true }, // Supports Date Picker
  time: { type: String, required: true },
  service: { type: String, required: true },
  artist: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('AppointmentBooking', appointmentBookingSchema);
