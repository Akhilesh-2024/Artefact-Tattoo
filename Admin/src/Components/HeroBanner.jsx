import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Save, Eye, Edit3, Palette, Type, ImageIcon, CheckCircle, XCircle, X } from "lucide-react";

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
  const [saveStatus, setSaveStatus] = useState({ show: false, type: '', message: '' });

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
      const response = await axios[isNew ? "post" : "put"](url, data);
      
      // Update the state instead of reloading the page
      if (response.data && response.data.background) {
        setPreview(`http://localhost:5001${response.data.background}`);
      }
      setBackground(null); // Clear the file input
      setIsNew(false); // Mark as existing record
      
      // Show success toast
      setSaveStatus({ show: true, type: 'success', message: 'Hero banner saved successfully!' });
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, type: '', message: '' });
      }, 3000);
      
    } catch (err) {
      console.error("Hero update failed:", err);
      
      // Show error toast
      setSaveStatus({ show: true, type: 'error', message: 'Failed to save hero banner. Please try again.' });
      
      // Auto-hide toast after 4 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, type: '', message: '' });
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Toast Notification */}
      {saveStatus.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border backdrop-blur-sm ${
            saveStatus.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {saveStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">{saveStatus.message}</span>
            <button
              onClick={() => setSaveStatus({ show: false, type: '', message: '' })}
              className="ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {isNew ? "Create" : "Edit"} Hero Banner
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Design your perfect hero section with live preview</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Content Editor</h2>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Subheading */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 text-blue-500" />
                  Subheading
                </label>
                <input
                  type="text"
                  name="subheading"
                  value={formData.subheading}
                  onChange={handleChange}
                  required
                  placeholder="Enter your subheading..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Heading Line 1 */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 text-indigo-500" />
                  Primary Heading
                </label>
                <input
                  type="text"
                  name="headingLine1"
                  value={formData.headingLine1}
                  onChange={handleChange}
                  required
                  placeholder="Enter your main heading..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Heading Line 2 */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 text-purple-500" />
                  Secondary Heading
                </label>
                <input
                  type="text"
                  name="headingLine2"
                  value={formData.headingLine2}
                  onChange={handleChange}
                  placeholder="Enter your secondary heading..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Button Text */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 text-green-500" />
                  Button Text
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  placeholder="Enter button text..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Button Link */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 text-orange-500" />
                  Button Link
                </label>
                <input
                  type="text"
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleChange}
                  placeholder="Enter button URL..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Background Upload */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <ImageIcon className="w-4 h-4 text-pink-500" />
                  Background Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="background"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 group-hover:scale-[1.02]">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3 group-hover:text-pink-500 transition-colors" />
                    <p className="text-gray-600 font-medium mb-1">Click or drag image to upload</p>
                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Live Preview Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Live Preview</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-900 min-h-96">
                {/* Background Image */}
                {preview && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${preview})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  </div>
                )}
                
                {/* Fallback background if no image */}
                {!preview && (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  </div>
                )}
                
                {/* Content Overlay */}
                <div className="relative z-10 flex items-center justify-center min-h-96 p-8">
                  <div className="text-center max-w-2xl">

                    {/* Subheading */}
                    {formData.subheading && (
                      <p className="text-lg md:text-xl text-gray-200 animate-pulse">
                        {formData.subheading}
                      </p>
                    )}

                    {/* Heading Line 1 */}
                    {formData.headingLine1 && (
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                        {formData.headingLine1}
                      </h1>
                    )}
                    
                    {/* Heading Line 2 */}
                    {formData.headingLine2 && (
                      <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 animate-pulse">
                        {formData.headingLine2}
                      </h2>
                    )}
                    
                    
                    
                    {/* Button */}
                    {formData.buttonText && (
                      <a
                        href={formData.buttonLink || "#"}
                        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse"
                      >
                        {formData.buttonText}
                      </a>
                    )}
                    
                    {/* Placeholder when no content */}
                    {!formData.headingLine1 && !formData.headingLine2 && !formData.subheading && (
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Start editing to see your hero banner come to life!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Preview Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live preview updates automatically as you type</span>
                </div>
              </div>

              {/* Image Preview Section */}
              {preview && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-700">Background Image</h3>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                    <img
                      src={preview}
                      alt="Background Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", preview);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-200 items-center justify-center hidden">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Image failed to load</p>
                        <p className="text-sm text-gray-400 mt-1">Please try uploading again</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Current image:</strong> {preview.includes('blob:') ? 'New upload (not saved yet)' : 'Saved image'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeroBanner;