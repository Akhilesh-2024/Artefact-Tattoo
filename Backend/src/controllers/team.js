import { team } from "../models/teamModel.js";
import fs from "fs";
import path from "path";

export const teamGet = async(req,res) => {
  try {
    const allTeamMember = await team.find();
    res.status(200).json(allTeamMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
}

export const teamPost = async(req,res) => {
  try {
    const {name, subname, img, info} = req.body;
    const imagePath = req.file ? `/upload/team/${req.file.filename}` : img;
    const add = new team({
      img: imagePath,
      name: name,
      subname: subname,
      info: info,
    })
    await add.save();
    res.status(200).json({Message:"Team Member Saved"});
  } catch (error) {
    console.log(error);
    res.status(500).json({Message:"Internal Server Error"});
  }
}

export const teamDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMember = await team.findById(id);
    if (!deleteMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    if (deleteMember.img) {
      const fullPath = path.join(process.cwd(), "src", deleteMember.img); // Use correct base path
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log("Deleted file:", fullPath);
      }
    }

    await team.findByIdAndDelete(id);
    res.status(200).json({ message: "Team member and image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const teamEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subname, info } = req.body;

    const existingMember = await team.findById(id);
    if (!existingMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    let updatedImagePath = existingMember.img;
    if (req.file) {
      if (existingMember.img) {
        const oldImagePath = path.join(process.cwd(), "src", existingMember.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("Old image deleted:", oldImagePath);
        }
      }

      updatedImagePath = `/upload/team/${req.file.filename}`;
    }

    existingMember.name = name;
    existingMember.subname = subname;
    existingMember.info = info;
    existingMember.img = updatedImagePath;

    await existingMember.save();

    res.status(200).json({ message: "Team member updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
