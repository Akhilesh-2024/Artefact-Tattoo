import mongoose from 'mongoose';

const appointmentContentSchema = new mongoose.Schema({
  subtitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  backgroundImage: { type: String }, // file path or external URL
}, { timestamps: true });

export default mongoose.model('AppointmentContent', appointmentContentSchema);
