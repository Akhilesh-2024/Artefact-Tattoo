import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  img: String, // image URL path
});

export const Client = mongoose.model("Client", clientSchema);
