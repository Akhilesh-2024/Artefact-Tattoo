import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Clock,
  MessageSquare,
  CheckCircle
} from "lucide-react";

const AdminFooterPanel = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchFooter = async () => {
    try {
      const res = await axios.get("/api/tatto/footer");
      setFooter(res.data);
    } catch (err) {
      console.error("Failed to fetch footer data", err);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFooter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFooter((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleWorkHourChange = (index, field, value) => {
    const updated = [...footer.workHours];
    updated[index][field] = value;
    setFooter((prev) => ({
      ...prev,
      workHours: updated,
    }));
  };

  const addWorkHour = () => {
    setFooter((prev) => ({
      ...prev,
      workHours: [...prev.workHours, { day: "", time: "" }],
    }));
  };

  const removeWorkHour = (index) => {
    const updated = [...footer.workHours];
    updated.splice(index, 1);
    setFooter((prev) => ({
      ...prev,
      workHours: updated,
    }));
  };

  const saveFooter = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/tatto/footer/${footer._id}`, footer);
      setFooter(res.data);
      setSuccessMsg("Saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to save footer", err);
    } finally {
      setLoading(false);
    }
  };

  if (!footer) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
        <p className="text-gray-600 text-lg">Loading footer settings...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Footer Settings</h1>
              <p className="text-gray-600">Manage your website's footer information and contact details</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <MapPin className="text-blue-600" size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <MapPin className="text-green-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  <p className="text-gray-600">Update your business contact details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="line1"
                      value={footer.address.line1}
                      onChange={(e) => handleNestedChange("address", "line1", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter address line 1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="line2"
                      value={footer.address.line2}
                      onChange={(e) => handleNestedChange("address", "line2", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter address line 2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="phone"
                      value={footer.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={footer.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-xl mr-4">
                  <Instagram className="text-purple-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Social Media Links</h2>
                  <p className="text-gray-600">Connect your social media profiles</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="instagram"
                      value={footer.socialLinks.instagram}
                      onChange={(e) => handleNestedChange("socialLinks", "instagram", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Instagram URL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Twitter</label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="twitter"
                      value={footer.socialLinks.twitter}
                      onChange={(e) => handleNestedChange("socialLinks", "twitter", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Twitter URL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">YouTube</label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="youtube"
                      value={footer.socialLinks.youtube}
                      onChange={(e) => handleNestedChange("socialLinks", "youtube", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="YouTube URL"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe Text */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-xl mr-4">
                  <MessageSquare className="text-orange-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Subscribe Message</h2>
                  <p className="text-gray-600">Customize your newsletter subscription text</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Subscribe Text</label>
                <textarea
                  value={footer.subscribeText}
                  name="subscribeText"
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                  placeholder="Enter your subscription message..."
                />
              </div>
            </div>
          </div>

          {/* Work Hours */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Work Hours</h2>
                  <p className="text-gray-600">Set your business hours</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {footer.workHours.map((wh, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-600">Day</label>
                        <input
                          type="text"
                          value={wh.day}
                          onChange={(e) => handleWorkHourChange(i, "day", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                          placeholder="e.g., Monday"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-600">Time</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={wh.time}
                            onChange={(e) => handleWorkHourChange(i, "time", e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                            placeholder="e.g., 10:00 - 20:00"
                          />
                          <button
                            type="button"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => removeWorkHour(i)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                onClick={addWorkHour}
              >
                <Plus size={18} className="mr-2" />
                Add Work Hour
              </button>

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={saveFooter}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={20} />
                      Save Changes
                    </>
                  )}
                </button>

                {successMsg && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-600 mr-2" size={18} />
                      <p className="text-green-800 font-medium">{successMsg}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooterPanel;