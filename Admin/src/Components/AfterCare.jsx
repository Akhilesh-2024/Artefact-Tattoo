import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, X, Upload, ImageIcon } from "lucide-react";

const AdminAftercare = () => {
  const [formData, setFormData] = useState({
    tattooHeading: "",
    tattooDescription: "",
    tattooPoints: [],
    piercingHeading: "",
    piercingDescription: "",
    piercingPoints: [],
  });

  const [tattooImage, setTattooImage] = useState(null);
  const [piercingImage, setPiercingImage] = useState(null);
  const [previewTattoo, setPreviewTattoo] = useState(null);
  const [previewPiercing, setPreviewPiercing] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/tatto/aftercare");
        const data = res.data;

        setFormData({
          tattooHeading: data?.tattoo?.heading || "",
          tattooDescription: data?.tattoo?.description || "",
          tattooPoints: data?.tattoo?.points || [],
          piercingHeading: data?.piercing?.heading || "",
          piercingDescription: data?.piercing?.description || "",
          piercingPoints: data?.piercing?.points || [],
        });

        setPreviewTattoo(
          `${import.meta.env.VITE_API_URL}${data?.tattoo?.image}`
        );
        setPreviewPiercing(
          `${import.meta.env.VITE_API_URL}${data?.piercing?.image}`
        );
      } catch (err) {
        console.error("Failed to fetch aftercare data", err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddPoint = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const handlePointChange = (type, index, value) => {
    const updated = [...formData[type]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const handleRemovePoint = (type, index) => {
    const updated = [...formData[type]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic required field validation
  if (
    !formData.tattooHeading.trim() ||
    !formData.tattooDescription.trim() ||
    !formData.piercingHeading.trim() ||
    !formData.piercingDescription.trim()
  ) {
    setPopup({
      show: true,
      message: "All headings and descriptions are required.",
      type: "error",
    });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
    return;
  }

  try {
    const submitData = new FormData();
    submitData.append("tattooHeading", formData.tattooHeading);
    submitData.append("tattooDescription", formData.tattooDescription);
    submitData.append("tattooPoints", JSON.stringify(formData.tattooPoints));
    submitData.append("piercingHeading", formData.piercingHeading);
    submitData.append("piercingDescription", formData.piercingDescription);
    submitData.append("piercingPoints", JSON.stringify(formData.piercingPoints));

    if (tattooImage) submitData.append("tattooImage", tattooImage);
    if (piercingImage) submitData.append("piercingImage", piercingImage);

    await axios.put("/api/tatto/aftercare", submitData);
    setPopup({
      show: true,
      message: "Aftercare saved successfully!",
      type: "success",
    });
  } catch (err) {
    console.error("Error updating aftercare", err);
    setPopup({
      show: true,
      message: "Failed to update aftercare.",
      type: "error",
    });
  } finally {
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  }
};


  const FileUploadCard = ({
    title,
    preview,
    onFileChange,
    accept = "image/*",
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors duration-200">
      <div className="flex flex-col items-center space-y-4">
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt={`${title} Preview`}
              className="max-w-full max-h-48 rounded-lg shadow-lg object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <Upload className="text-white" size={24} />
            </div>
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <ImageIcon className="text-gray-400" size={32} />
          </div>
        )}

        <div>
          <label className="cursor-pointer inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors duration-200">
            <Upload size={16} />
            <span className="text-sm font-medium">
              {preview ? "Change Image" : "Upload Image"}
            </span>
            <input
              type="file"
              accept={accept}
              onChange={onFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">
              Aftercare Management
            </h2>
            <p className="text-indigo-100 mt-2">
              Manage tattoo and piercing aftercare information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Tattoo Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-lg">T</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Tattoo Aftercare
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      name="tattooHeading"
                      value={formData.tattooHeading}
                      onChange={handleInputChange}
                      placeholder="Enter tattoo aftercare heading"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="tattooDescription"
                      value={formData.tattooDescription}
                      onChange={handleInputChange}
                      placeholder="Enter detailed description for tattoo aftercare"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Care Points
                    </label>
                    <div className="space-y-3">
                      {formData.tattooPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              value={point}
                              onChange={(e) =>
                                handlePointChange(
                                  "tattooPoints",
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder={`Care point ${index + 1}`}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemovePoint("tattooPoints", index)
                            }
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddPoint("tattooPoints")}
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Plus size={18} />
                        <span>Add Care Point</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tattoo Image
                    </label>
                    <FileUploadCard
                      title="Tattoo"
                      preview={previewTattoo}
                      onFileChange={(e) => {
                        setTattooImage(e.target.files[0]);
                        setPreviewTattoo(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Piercing Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">P</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Piercing Aftercare
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      name="piercingHeading"
                      value={formData.piercingHeading}
                      onChange={handleInputChange}
                      placeholder="Enter piercing aftercare heading"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="piercingDescription"
                      value={formData.piercingDescription}
                      onChange={handleInputChange}
                      placeholder="Enter detailed description for piercing aftercare"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Care Points
                    </label>
                    <div className="space-y-3">
                      {formData.piercingPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              value={point}
                              onChange={(e) =>
                                handlePointChange(
                                  "piercingPoints",
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder={`Care point ${index + 1}`}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemovePoint("piercingPoints", index)
                            }
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddPoint("piercingPoints")}
                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Plus size={18} />
                        <span>Add Care Point</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Piercing Image
                    </label>
                    <FileUploadCard
                      title="Piercing"
                      preview={previewPiercing}
                      onFileChange={(e) => {
                        setPiercingImage(e.target.files[0]);
                        setPreviewPiercing(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 flex justify-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {popup.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-md text-white font-medium transition-all duration-300 ${
            popup.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default AdminAftercare;
