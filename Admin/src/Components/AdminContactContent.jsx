import { useState, useEffect } from "react";
import axios from "axios";
import { Save, MapPin, Phone, Mail, Building2, FileText } from "lucide-react";

const AdminContactContent = () => {
  const [content, setContent] = useState({
    studioTitle: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const [popup, setPopup] = useState(null);

  useEffect(() => {
    axios
      .get("/api/tatto/contact/content")
      .then((res) => {
        if (res.data) setContent(res.data);
      })
      .catch((err) => {
        console.error("Failed to load content", err);
        setPopup({ type: "error", message: "Failed to load content." });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/tatto/contact/content", content);
      setPopup({ type: "success", message: "Content saved successfully!" });
    } catch (err) {
      console.error("Save failed", err);
      setPopup({ type: "error", message: "Failed to save content." });
    } finally {
      setTimeout(() => setPopup(null), 3000);
    }
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case "studioTitle":
        return <Building2 size={20} className="text-indigo-500" />;
      case "description":
        return <FileText size={20} className="text-indigo-500" />;
      case "address":
        return <MapPin size={20} className="text-indigo-500" />;
      case "phone":
        return <Phone size={20} className="text-indigo-500" />;
      case "email":
        return <Mail size={20} className="text-indigo-500" />;
      default:
        return null;
    }
  };

  const getFieldLabel = (field) => {
    switch (field) {
      case "studioTitle":
        return "Studio Title";
      case "description":
        return "Description";
      case "address":
        return "Address";
      case "phone":
        return "Phone Number";
      case "email":
        return "Email Address";
      default:
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Building2 size={32} />
              Edit Contact Section Content
            </h2>
            <p className="text-indigo-100 mt-2">
              Manage your studio's contact information and details
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-8">
              {["studioTitle", "description", "address", "phone", "email"].map((field) => (
                <div key={field} className="group">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                    {getFieldIcon(field)}
                    {getFieldLabel(field)}
                  </label>
                  
                  {field === "description" ? (
                    <div className="relative">
                      <textarea
                        rows={4}
                        name={field}
                        value={content[field]}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none placeholder-gray-400"
                        placeholder="Enter a detailed description of your studio..."
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {content[field].length} characters
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      name={field}
                      value={content[field]}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 placeholder-gray-400"
                      placeholder={
                        field === "studioTitle" ? "Enter your studio name..." :
                        field === "address" ? "Enter your studio address..." :
                        field === "phone" ? "Enter your phone number..." :
                        field === "email" ? "Enter your email address..." :
                        `Enter ${field}...`
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleSave}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold"
              >
                <Save size={20} className="group-hover:rotate-12 transition-transform duration-200" />
                Save Changes
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </div>

            {/* Popup Notification */}
            {popup && (
              <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-full duration-300">
                <div
                  className={`px-6 py-4 rounded-xl shadow-lg border-l-4 ${
                    popup.type === "success"
                      ? "bg-green-50 border-green-500 text-green-800"
                      : "bg-red-50 border-red-500 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {popup.type === "success" ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                    <span className="font-medium">{popup.message}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactContent;