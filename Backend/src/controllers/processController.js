import Process from "../models/processModel.js";

// GET all processes
export const getAllProcesses = async (req, res) => {
  try {
    const processes = await Process.find();
    res.status(200).json(processes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching processes", error: err });
  }
};

// CREATE a new process
export const createProcess = async (req, res) => {
  try {
    const newProcess = new Process(req.body);
    const saved = await newProcess.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating process", error: err });
  }
};

// UPDATE an existing process by ID
export const updateProcess = async (req, res) => {
  try {
    const updated = await Process.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Process not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating process", error: err });
  }
};

// DELETE a process by ID
export const deleteProcess = async (req, res) => {
  try {
    const deleted = await Process.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Process not found" });
    }
    res.status(200).json({ message: "Process deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting process", error: err });
  }
};
