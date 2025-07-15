import Subscriber from "../models/subscriberModel.js";

export const addSubscriber = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscribed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Subscription failed." });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscribers." });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const deleted = await Subscriber.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Subscriber not found." });
    }
    res.status(200).json({ message: "Subscriber deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete subscriber." });
  }
};

