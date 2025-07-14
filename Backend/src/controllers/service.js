import { Service } from "../models/serviceModel.js";
import fs from "fs";
import path from "path";

// GET all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services." });
  }
};

// POST new service
export const createService = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const img = req.file?.filename;

    const newService = new Service({
      title,
      description,
      order,
      img
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Failed to create service." });
  }
};

// UPDATE a service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, order } = req.body;

    const existingService = await Service.findById(id);
    if (!existingService) return res.status(404).json({ message: "Service not found" });

    if (req.file) {
      // Delete old image
      if (existingService.img) {
        const oldPath = `uploads/service/${existingService.img}`;
        fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
      }
      existingService.img = req.file.filename;
    }

    existingService.title = title;
    existingService.description = description;
    existingService.order = order;

    await existingService.save();
    res.json(existingService);
  } catch (error) {
    res.status(500).json({ message: "Failed to update service." });
  }
};

// DELETE a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) return res.status(404).json({ message: "Service not found" });

    // Delete image
    if (service.img) {
      const filePath = `uploads/service/${service.img}`;
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
    }

    res.json({ message: "Service deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service." });
  }
};
