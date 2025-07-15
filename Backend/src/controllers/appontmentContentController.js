import AppointmentContent from "../models/appointmentContent.js";
import fs from "fs";
import path from "path";

export const getAppointmentContent = async (req, res) => {
  try {
    const content = await AppointmentContent.findOne();
    res.status(200).json(content || {
      subtitle: "",
      title: "",
      description: "",
      phoneNumber: "",
      backgroundImage: null,
    });
  } catch (error) {
    console.error("Get Appointment Content Error:", error);
    res.status(500).json({ error: "Failed to get appointment content." });
  }
};

export const createOrUpdateAppointmentContent = async (req, res) => {
  try {
    const { subtitle, title, description, phoneNumber } = req.body;
    const file = req.file;

    let content = await AppointmentContent.findOne();

    if (!subtitle || !title || !description || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!content) {
      // Create new
      content = new AppointmentContent({
        subtitle,
        title,
        description,
        phoneNumber,
        backgroundImage: file ? `/upload/appointment/${file.filename}` : null,
      });
    } else {
      // Update existing
      content.subtitle = subtitle;
      content.title = title;
      content.description = description;
      content.phoneNumber = phoneNumber;

      if (file) {
        // Delete old image if it exists
        if (content.backgroundImage) {
          const oldFile = content.backgroundImage.split("/").pop();
          const paths = [
            path.join(process.cwd(), "src", "upload", "appointment", oldFile),
            path.join(process.cwd(), "src", "Upload", "appointment", oldFile),
          ];
          paths.forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
        }

        content.backgroundImage = `/upload/appointment/${file.filename}`;
      }
    }

    await content.save();
    res.status(200).json({ message: "Appointment content saved successfully", content });
  } catch (error) {
    console.error("Save Appointment Content Error:", error);
    res.status(500).json({ error: "Failed to create or update appointment content." });
  }
};
