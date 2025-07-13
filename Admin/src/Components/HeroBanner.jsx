import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Save, Image as ImageIcon } from "lucide-react";

const AdminHeroBanner = () => {
  const [formData, setFormData] = useState({
    headingLine1: "",
    headingLine2: "",
    subheading: "",
    buttonText: "",
    buttonLink: "",
  });

  const [background, setBackground] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Fetch hero data
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("/api/tatto/hero");
        const hero = res.data;

        setFormData({
          headingLine1: hero.headingLine1 || "",
          headingLine2: hero.headingLine2 || "",
          subheading: hero.subheading || "",
          buttonText: hero.buttonText || "",
          buttonLink: hero.buttonLink || "",
        });

        if (hero.background) {
          // Make sure we're using the correct URL
          setPreview(`http://localhost:5001${hero.background}`);
          console.log("Hero background URL:", `http://localhost:5001${hero.background}`);
        }

        setIsNew(false);
      } catch (err) {
        if (err.response?.status === 404) {
          setIsNew(true);
        } else {
          console.error("Failed to fetch hero data:", err);
        }
      }
    };

    fetchHero();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "background" && files.length > 0) {
      const file = files[0];
      setBackground(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("headingLine1", formData.headingLine1);
    data.append("headingLine2", formData.headingLine2);
    data.append("subheading", formData.subheading);
    data.append("buttonText", formData.buttonText);
    data.append("buttonLink", formData.buttonLink);
    if (background) data.append("background", background);

    try {
      const url = "/api/tatto/hero";
      await axios[isNew ? "post" : "put"](url, data);
      alert("Hero banner saved successfully");
      window.location.reload();
    } catch (err) {
      console.error("Hero update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-indigo-600" />
        {isNew ? "Create" : "Edit"} Hero Banner
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading Line 1 */}
        <div>
          <label className="block font-semibold mb-2">Heading Line 1</label>
          <input
            type="text"
            name="headingLine1"
            value={formData.headingLine1}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* Heading Line 2 */}
        <div>
          <label className="block font-semibold mb-2">Heading Line 2</label>
          <input
            type="text"
            name="headingLine2"
            value={formData.headingLine2}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* Subheading */}
        <div>
          <label className="block font-semibold mb-2">Subheading</label>
          <input
            type="text"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* Button Text */}
        <div>
          <label className="block font-semibold mb-2">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* Button Link */}
        <div>
          <label className="block font-semibold mb-2">Button Link</label>
          <input
            type="text"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* Background Upload */}
        <div>
          <label className="block font-semibold mb-2">Background Image</label>
          <div className="relative">
            <input
              type="file"
              name="background"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-600">Click or drag image to upload</p>
            </div>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <label className="block font-semibold mb-2">Preview</label>
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-96 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          <Save className="w-5 h-5" />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminHeroBanner;
