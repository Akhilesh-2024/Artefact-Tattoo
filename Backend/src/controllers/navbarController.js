import { Navbar } from "../models/navbarModel.js";
import fs from "fs";
import path from "path";

// GET NAVBAR (for frontend)
export const getNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne();
    if (!navbar) return res.status(404).json({ message: "Navbar not found" });

    res.status(200).json(navbar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE or UPDATE NAVBAR
export const saveOrUpdateNavbar = async (req, res) => {
  try {
    const { navItems } = req.body;
    const parsedNavItems = navItems ? JSON.parse(navItems) : [];

    let navbar = await Navbar.findOne();

    // Upload directory path prefix (can be environment-based)
    const logoPathPrefix = "/upload/navbar/";

    if (!navbar) {
      navbar = new Navbar({
        logo: req.file ? `${logoPathPrefix}${req.file.filename}` : null,
        navItems: parsedNavItems,
      });
    } else {
      // Remove old logo if new uploaded
      if (req.file) {
        if (navbar.logo) {
          const oldLogoFile = navbar.logo.split("/").pop(); // Extract filename from path

          const upperCasePath = path.join(process.cwd(), "src", "Upload", "navbar", oldLogoFile);
          const lowerCasePath = path.join(process.cwd(), "src", "upload", "navbar", oldLogoFile);

          if (fs.existsSync(upperCasePath)) fs.unlinkSync(upperCasePath);
          if (fs.existsSync(lowerCasePath)) fs.unlinkSync(lowerCasePath);
        }

        navbar.logo = `${logoPathPrefix}${req.file.filename}`;
      }

      if (parsedNavItems) {
        navbar.navItems = parsedNavItems;
      }
    }

    await navbar.save();
    res.status(200).json({ message: "Navbar saved or updated successfully", navbar });

  } catch (err) {
    console.error("Navbar save/update error:", err);
    res.status(500).json({ error: err.message });
  }
};
