import { useEffect, useState } from "react";
import axios from "axios";
import {
  Upload,
  Save,
  Trash2,
  X,
  Pencil,
  Layers,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowUpDown
} from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: ""
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/tatto/service");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const img = e.dataTransfer.files[0];
      setFile(img);
      setPreview(URL.createObjectURL(img));
    }
  };

  const clearForm = () => {
    setFormData({ title: "", description: "", order: "" });
    setFile(null);
    setPreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("order", formData.order);
    if (file) payload.append("img", file);

    try {
      if (editingId) {
        await axios.put(`/api/tatto/service/${editingId}`, payload);
        setMessage("Service updated successfully");
      } else {
        await axios.post("/api/tatto/service", payload);
        setMessage("Service created successfully");
      }
      fetchServices();
      clearForm();
    } catch (err) {
      console.error("Error submitting form", err);
      setMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      order: service.order
    });
    setPreview(`${baseURL}/uploads/service/${service.img}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      setIsLoading(true);
      await axios.delete(`/api/tatto/service/${id}`);
      setMessage("Service deleted");
      fetchServices();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-800 via-pink-700 to-red-700 bg-clip-text text-transparent mb-4">
            {editingId ? "Edit Service" : "Add New Service"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your tattoo services with style and precision
          </p>

          {message && (
            <div className={`inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full shadow-lg transform animate-pulse ${
              message.includes("successfully") || message.includes("deleted") 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {message.includes("successfully") || message.includes("deleted") ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-semibold">{message}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 px-8 py-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">
                    {editingId ? "Update Service" : "Create Service"}
                  </h2>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter service title"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" /> Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Enter service description"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Image Upload
                    </label>
                    <label
                      className={`cursor-pointer relative h-40 border-2 border-dashed rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        dragActive 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-25'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="text-center">
                        <Upload className={`w-10 h-10 mx-auto mb-3 ${dragActive ? 'text-purple-500' : 'text-gray-400'}`} />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>

                  {preview && (
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <h3 className="text-sm font-bold mb-2">Preview</h3>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg disabled:opacity-50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Save size={18} />
                        {isLoading ? "Processing..." : editingId ? "Update" : "Create"}
                      </div>
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={clearForm}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 rounded-xl font-bold"
                      >
                        <div className="flex items-center gap-2">
                          <X size={18} /> Cancel
                        </div>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 px-8 py-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Layers className="w-8 h-8" />
                  Existing Services
                  <span className="text-lg bg-white/20 px-3 py-1 rounded-full">
                    {services.length}
                  </span>
                </h2>
              </div>

              <div className="p-8 space-y-6">
                {isLoading ? (
                  <div className="text-center text-lg text-gray-600">Loading...</div>
                ) : services.length === 0 ? (
                  <div className="text-center text-gray-500">No services yet.</div>
                ) : (
                  services.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 border hover:border-purple-200 transition-all duration-300 group"
                      style={{
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        <img
                          src={`${baseURL}/uploads/service/${item.img}`}
                          alt={item.title}
                          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-xl font-bold">{item.title}</h3>
                              <div className="text-sm text-purple-600 mt-1">
                                <ArrowUpDown className="inline-block w-4 h-4 mr-1" />
                                Order: {item.order}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl font-semibold transition-all duration-200"
                              >
                                <Pencil size={16} className="inline-block mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl font-semibold transition-all duration-200"
                              >
                                <Trash2 size={16} className="inline-block mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm sm:text-base break-words">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminServices;
