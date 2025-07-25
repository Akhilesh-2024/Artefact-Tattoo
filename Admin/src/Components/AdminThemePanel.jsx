import { useEffect, useState } from "react";
import axios from "axios";
import { Paintbrush, Save, Loader2 } from "lucide-react";

const colorFields = [
  { key: "primaryColor", label: "Primary Color" },
  { key: "secondaryColor", label: "Secondary Color" },
  { key: "darkColor", label: "Dark Color" },
  { key: "whiteColor", label: "White Color" },
  { key: "textColor", label: "Text Color" },
  { key: "textMuted", label: "Text Muted" },
  { key: "textLight", label: "Text Light" },
  { key: "borderColor", label: "Border Color" },
  { key: "borderDark", label: "Border Dark" },
  { key: "overlayDark", label: "Overlay Dark" },
  { key: "bgSuccess", label: "Success Background" },
  { key: "bgDanger", label: "Danger Background" },
  { key: "borderColorLight", label: "Border Light" },
  { key: "borderColorMedium", label: "Border Medium" },
  { key: "borderColorStrong", label: "Border Strong" },
  { key: "borderColorBold", label: "Border Bold" },
  { key: "borderColorSubtle", label: "Border Subtle" },
  { key: "borderColorFaint", label: "Border Faint" },
  { key: "borderColorMedium2", label: "Border Medium-2" },
];

const AdminThemePanel = () => {
  const [theme, setTheme] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch current theme
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get("/api/tatto/theme");
        setTheme(res.data);
      } catch (err) {
        console.error("Error fetching theme:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  const handleColorChange = (key, value) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const saveTheme = async () => {
    setSaving(true);
    setMessage("");
    try {
      await axios.put("/api/tatto/theme", theme);
      setMessage("Theme updated successfully!");
    } catch (err) {
      console.error("Error updating theme:", err);
      setMessage("Failed to update theme.");
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
          <p className="text-slate-600 text-lg font-medium">Loading Theme...</p>
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
                <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              Theme Color Manager
            </h2>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mx-6 mt-5 p-3 rounded-lg border-l-4 ${
                message.includes("success")
                  ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                  : "bg-red-50 border-red-400 text-red-800"
              }`}
            >
              <p className="font-medium text-sm sm:text-base">{message}</p>
            </div>
          )}

          {/* Color Fields */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorFields.map(({ key, label }) => (
              <div
                key={key}
                className="bg-slate-100 rounded-lg p-4 border border-slate-200 flex flex-col gap-2"
              >
                <label className="text-sm font-semibold text-slate-700">
                  {label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme[key] || "#000000"}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-slate-300"
                  />
                  <input
                    type="text"
                    value={theme[key] || ""}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="flex-1 px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 text-sm"
                  />
                  <div
                    className="w-8 h-8 border border-slate-300 rounded"
                    style={{ backgroundColor: theme[key] }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end px-6 pb-6">
            <button
              onClick={saveTheme}
              disabled={saving}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${
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
              <span>{saving ? "Saving..." : "Save Theme"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminThemePanel;
