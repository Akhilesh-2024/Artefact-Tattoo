import Footer from "../models/footerModel.js";

// GET footer data
export const getFooter = async (req, res) => {
  try {
    const data = await Footer.findOne(); // assuming single footer document
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to get footer data" });
  }
};

// POST new footer
export const createFooter = async (req, res) => {
  try {
    const existing = await Footer.findOne();
    if (existing) {
      return res.status(400).json({ message: "Footer already exists. Use PUT to update." });
    }

    const newFooter = new Footer(req.body);
    await newFooter.save();
    res.status(201).json(newFooter);
  } catch (err) {
    res.status(500).json({ error: "Failed to create footer" });
  }
};

// PUT update footer
export const updateFooter = async (req, res) => {
  try {
    const updated = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update footer" });
  }
};

// DELETE footer
export const deleteFooter = async (req, res) => {
  try {
    await Footer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Footer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete footer" });
  }
};

// PATCH social links or work hours
export const patchFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: "Footer not found" });

    const { socialLinks, workHours } = req.body;

    if (socialLinks) {
      footer.socialLinks = { ...footer.socialLinks, ...socialLinks };
    }

    if (workHours) {
      footer.workHours = workHours; // replace whole array
    }

    await footer.save();
    res.status(200).json(footer);
  } catch (err) {
    res.status(500).json({ error: "Failed to patch footer" });
  }
};
