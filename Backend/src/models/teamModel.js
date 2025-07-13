import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    img: String,
    name: String,
    subname: String,
    info: String,
})

export const team = mongoose.model("team",teamSchema);