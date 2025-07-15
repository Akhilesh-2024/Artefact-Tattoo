import ContactContent from "../models/ContactContentModel.js";
import ContactForm from "../models/ContactFormModel.js";

// GET - Fetch contact content (like studioTitle, address, etc.)
export const getContactContent = async (req, res) => {
  try {
    const content = await ContactContent.findOne();
    res.status(200).json(content || {}); // Return empty object if none found
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact content" });
  }
};

// PUT - Update or create contact page content
export const updateContactContent = async (req, res) => {
  try {
    const existing = await ContactContent.findOne();
    if (existing) {
      await ContactContent.findByIdAndUpdate(existing._id, req.body, { new: true });
    } else {
      await ContactContent.create(req.body);
    }
    res.status(200).json({ message: "Content updated" });
  } catch (err) {
    console.error("Update contact content failed:", err);
    res.status(500).json({ message: "Failed to update contact content" });
  }
};

// POST - Save form submissions from frontend
export const submitContactForm = async (req, res) => {
  try {
    await ContactForm.create(req.body);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Submit form error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// GET - Admin inbox: fetch all messages
export const getAllContactForms = async (req, res) => {
  try {
    const messages = await ContactForm.find()
      .sort({ createdAt: -1 })

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// DELETE - Admin deletes a message
export const deleteContactForm = async (req, res) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message" });
  }
};
