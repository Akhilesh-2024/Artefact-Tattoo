import { useEffect, useState } from "react";
import { Save, Edit3, Trash2, Users, MessageSquare, Camera, X } from "lucide-react";
import axios from "axios";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    img: null,
  });
  const [editId, setEditId] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await axios.get("/api/tatto/testimonials");
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  const handleTestimonialSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("role", formData.role);
    fd.append("message", formData.message);
    if (formData.img instanceof File) {
      fd.append("img", formData.img);
    }

    if (editId) {
      await axios.put(`/api/tatto/testimonials/${editId}`, fd);
      setEditId(null);
    } else {
      await axios.post("/api/tatto/testimonials", fd);
    }

    setFormData({ name: "", role: "", message: "", img: null });
    setImgPreview(null);

    const { data } = await axios.get("/api/tatto/testimonials");
    setTestimonials(data);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      role: item.role,
      message: item.message,
      img: null,
    });
    setEditId(item._id);
    setImgPreview(`${import.meta.env.VITE_API_URL}${item.img}`);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tatto/testimonials/${id}`);
    setTestimonials(testimonials.filter((t) => t._id !== id));
  };

  const clearForm = () => {
    setFormData({ name: "", role: "", message: "", img: null });
    setEditId(null);
    setImgPreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
          </div>
          <p className="text-gray-600">Manage customer testimonials and reviews</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <MessageSquare size={20} />
                  {editId ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter customer name"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role/Position</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., CEO, Designer, Customer"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Testimonial Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share their experience and feedback..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Profile Photo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setFormData({ ...formData, img: e.target.files[0] });
                        setImgPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors duration-200 flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50"
                    >
                      <Camera size={20} className="text-gray-500" />
                      <span className="text-gray-600">Choose profile photo</span>
                    </label>
                  </div>
                  
                  {imgPreview && (
                    <div className="relative inline-block">
                      <img
                        src={imgPreview}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImgPreview(null);
                          setFormData({ ...formData, img: null });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleTestimonialSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                  >
                    <Save size={18} />
                    {editId ? "Update Testimonial" : "Add Testimonial"}
                  </button>
                  
                  {editId && (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
              <div className="bg-gradient-to-r from-slate-800 to-gray-900 px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <MessageSquare size={20} />
                  All Testimonials ({testimonials.length})
                </h2>
              </div>
              
              <div className="p-6">
                {testimonials.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Users size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No testimonials yet</p>
                    <p className="text-gray-400 text-sm">Add your first testimonial to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testimonials.map((item) => (
                      <div
                        key={item._id}
                        className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-gray-300"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={`${import.meta.env.VITE_API_URL}${item.img}`}
                              alt={item.name}
                              className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                                <p className="text-sm text-blue-600 font-medium">{item.role}</p>
                              </div>
                              
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-gray-700 leading-relaxed">
                                {item.message.length > 120 
                                  ? `${item.message.slice(0, 120)}...` 
                                  : item.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default AdminTestimonials;