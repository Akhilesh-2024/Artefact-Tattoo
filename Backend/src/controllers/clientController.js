import { Client } from "../models/clientModel.js";
import fs from "fs";
import path from "path";

// GET all clients
export const getClients = async (req, res) => {
  try {
    const data = await Client.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};

// POST new client logo
export const postClient = async (req, res) => {
  try {
    const { name } = req.body;
    const img = req.file ? `/upload/clients/${req.file.filename}` : "";

    const newClient = new Client({ name, img });
    await newClient.save();
    res.status(200).json({ message: "Client added" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Client.findById(id);
    if (!existing) return res.status(404).json({ message: "Client not found" });

    if (existing.img) {
      const fullPath = path.join(process.cwd(), "src", existing.img);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT update client logo or name
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const existing = await Client.findById(id);

    if (!existing) return res.status(404).json({ message: "Client not found" });

    // Delete old image if a new one is uploaded
    if (req.file && existing.img) {
      const oldPath = path.join(process.cwd(), "src", existing.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const img = req.file ? `/upload/clients/${req.file.filename}` : existing.img;

    existing.name = name;
    existing.img = img;

    await existing.save();
    res.status(200).json({ message: "Client updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
