import { team } from "../Database/database.js";

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

export const teamDelete = async(req,res) => {
  try {
    const { id } = req.params;
    const deleteMember = await team.findByIdAndDelete(id);

    if (!deleteMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.status(200).json({ message: "Team member deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}