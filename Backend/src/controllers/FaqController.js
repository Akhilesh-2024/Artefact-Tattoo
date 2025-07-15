import Faq from "../models/FaqModel.js";

// GET all FAQs
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
};

// POST a new FAQ
export const createFaq = async (req, res) => {
  try {
    const newFaq = new Faq(req.body);
    const saved = await newFaq.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create FAQ" });
  }
};

// PUT update FAQ
export const updateFaq = async (req, res) => {
  try {
    const updated = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update FAQ" });
  }
};

// DELETE FAQ
export const deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete FAQ" });
  }
};
