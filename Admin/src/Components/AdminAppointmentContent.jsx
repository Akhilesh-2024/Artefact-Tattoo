import { useEffect, useState } from "react";
import { Upload, Save, Loader2, Eye, CheckCircle } from "lucide-react";
import axios from "axios";

const AdminAppointmentContent = () => {
  const [formData, setFormData] = useState({
    subtitle: "",
    title: "",
    description: "",
    phoneNumber: "",
    backgroundImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get("/api/tatto/appointment-content");
        const content = res.data;
        setFormData({
          subtitle: content?.subtitle || "",
          title: content?.title || "",
          description: content?.description || "",
          phoneNumber: content?.phoneNumber || "",
          backgroundImage: null,
        });

        const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
        const imagePath = content.backgroundImage?.replace(/^\/?/, ""); // ensure no leading double slashes
        setPreview(`${baseUrl}/${imagePath}`);

      } catch (err) {
        console.error("Failed to load appointment content", err);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, backgroundImage: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("subtitle", formData.subtitle);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("phoneNumber", formData.phoneNumber);
      if (formData.backgroundImage) {
        data.append("backgroundImage", formData.backgroundImage);
      }

      await axios.post("/api/tatto/appointment-content", data);
      setMessage("Appointment content saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving appointment content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              Edit Appointment Section
            </h2>
          </div>

          {/* Message */}
          {message && (
            <div className={`mx-6 mt-5 p-3 rounded-lg border-l-4 ${
              message.includes("success") 
                ? "bg-emerald-50 border-emerald-400 text-emerald-800 flex items-center gap-2"
                : "bg-red-50 border-red-400 text-red-800"
            }`}>
              {message.includes("success") && <CheckCircle className="w-5 h-5" />}
              <p className="font-medium text-sm sm:text-base">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Image Preview */}
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
                        <p className="text-slate-500">No image selected</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-slate-200">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center w-full h-12 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Upload className="w-5 h-5" />
                          <span className="font-medium">Choose Background Image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter section subtitle"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter section title"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Enter description text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. 855 100 4444"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      saving
                        ? "bg-slate-400 text-slate-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    <span>{saving ? "Saving..." : "Save Section"}</span>
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

export default AdminAppointmentContent;
