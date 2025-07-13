import { useEffect, useState } from "react";
import { Plus, Trash2, Upload, Eye, Save, Loader2 } from "lucide-react";
import axios from "axios";

const AdminAbout = () => {
  const [formData, setFormData] = useState({
    established: "",
    title: "",
    subTitle: "",
    description: "",
    points: [""],
    img: null,
  });

  const [existingId, setExistingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("/api/tatto/about");
        const about = res.data;
        setFormData({
          established: about.established || "",
          title: about.title || "",
          subTitle: about.subTitle || "",
          description: about.description || "",
          points: about.points || [""],
          img: null,
        });
        setPreview(`${import.meta.env.VITE_API_URL}${about.img}`);
        setExistingId(about._id);
      } catch (err) {
        console.warn("No existing about data. Ready to create new.");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePointsChange = (index, value) => {
    const updatedPoints = [...formData.points];
    updatedPoints[index] = value;
    setFormData((prev) => ({ ...prev, points: updatedPoints }));
  };

  const addPoint = () => {
    setFormData((prev) => ({ ...prev, points: [...prev.points, ""] }));
  };

  const removePoint = (index) => {
    const updatedPoints = formData.points.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, points: updatedPoints }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, img: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("established", formData.established);
      data.append("title", formData.title);
      data.append("subTitle", formData.subTitle);
      data.append("description", formData.description);
      data.append("points", JSON.stringify(formData.points));
      if (formData.img) {
        data.append("img", formData.img);
      }

      const method = existingId ? "put" : "post";
      const url = "/api/tatto/about";
      await axios[method](url, data);

      setMessage("Saved successfully.");
    } catch (err) {
      console.error("Failed to save about:", err);
      setMessage("Error saving. See console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Loading About data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {existingId ? "Edit" : "Create"} About Section
            </h2>
          </div>

          {/* Message */}
          {message && (
            <div className={`mx-6 mt-5 p-3 rounded-lg border-l-4 ${
              message.includes("successfully") 
                ? "bg-emerald-50 border-emerald-400 text-emerald-800" 
                : "bg-red-50 border-red-400 text-red-800"
            }`}>
              <p className="font-medium text-sm sm:text-base">{message}</p>
            </div>
          )}

          {/* Main Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Image Preview and Upload */}
              <div className="md:col-span-1 space-y-4">
                <div className="bg-slate-100 rounded-lg overflow-hidden flex flex-col">
                  <div className="h-64 flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500">
                          No image selected
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-slate-200">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center w-full h-12 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Upload className="w-5 h-5" />
                          <span className="font-medium">Choose Image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="md:col-span-2 space-y-4">
                {/* Established */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Established Year
                  </label>
                  <input
                    type="text"
                    name="established"
                    value={formData.established}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                    placeholder="e.g., 2020"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Main Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                    placeholder="Enter the main title"
                  />
                </div>

                {/* SubTitle */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                    placeholder="Enter the subtitle"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300 resize-none"
                    placeholder="Enter a detailed description..."
                  />
                </div>

                {/* Points */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Key Points
                  </label>
                  <div className="space-y-2">
                    {formData.points.map((point, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => handlePointsChange(index, e.target.value)}
                          className="flex-1 px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                          placeholder={`Point ${index + 1}`}
                        />
                        {formData.points.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePoint(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPoint}
                      className="flex items-center space-x-2 px-3 py-2.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 border-2 border-dashed border-blue-200 hover:border-blue-300 w-full justify-center"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Add Point</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      saving
                        ? "bg-slate-400 text-slate-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    <span>{saving ? "Saving..." : "Save About Section"}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;