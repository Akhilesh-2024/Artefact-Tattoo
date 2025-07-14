import mongoose from "mongoose";

const subLinkSchema = new mongoose.Schema({
  label: String,
  path: String,
  children: [
    {
      label: String,
      path: String,
    },
  ],
});

const navItemSchema = new mongoose.Schema({
  label: String,
  path: String,
  dropdown: { type: Boolean, default: false },
  subItems: [subLinkSchema],
});

const navbarSchema = new mongoose.Schema({
  logo: {
    type: String,
    default: null,
  },
  navItems: [navItemSchema],
});

export const Navbar = mongoose.model("Navbar", navbarSchema);