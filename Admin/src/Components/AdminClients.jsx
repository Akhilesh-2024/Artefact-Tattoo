import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, Save, Edit3, Image, X, Check, AlertCircle } from "lucide-react";

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: "", img: null });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("/api/tatto/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
      showNotification("Error fetching clients", 'error');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({ name: "", img: null });
    setPreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) return alert("Name is required");

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.img) data.append("img", formData.img);

    try {
      if (editingId) {
        await axios.put(`/api/tatto/clients/${editingId}`, data);
        showNotification("Client updated successfully!");
      } else {
        await axios.post("/api/tatto/clients", data);
        showNotification("Client added successfully!");
      }
      fetchClients();
      resetForm();
    } catch (err) {
      console.error("Error submitting client:", err);
      showNotification("Error saving client", 'error');
    }
  };

  const handleEdit = (client) => {
    setFormData({ name: client.name, img: null });
    setPreview(import.meta.env.VITE_API_URL + client.img);
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;

    try {
      await axios.delete(`/api/tatto/clients/${id}`);
      showNotification("Client deleted successfully!");
      fetchClients();
    } catch (err) {
      console.error("Error deleting client:", err);
      showNotification("Error deleting client", 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Client Management</h1>
          <p className="text-gray-600">Manage your tattoo studio clients and their information</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              {editingId ? <Edit3 className="text-blue-600" size={24} /> : <Plus className="text-blue-600" size={24} />}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "Edit Client" : "Add New Client"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Client Logo</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 transition-all duration-200">
                    <Image size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>

                  {preview && (
                    <div className="relative group">
                      <img src={preview} alt="preview" className="w-16 h-16 object-cover rounded-xl border-2 border-gray-200 shadow-sm bg-cyan-950" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, img: null });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium"
              >
                <Save size={18} /> 
                {editingId ? "Update Client" : "Save Client"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Clients Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Image className="text-purple-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">All Clients</h2>
            <div className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {clients.length} clients
            </div>
          </div>

          {clients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No clients added yet</p>
              <p className="text-gray-400 text-sm">Add your first client to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {clients.map((client) => (
                <div key={client._id} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-cyan-950 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
                        <img
                          src={import.meta.env.VITE_API_URL + client.img}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{client.name}</h3>
                      <p className="text-gray-500 text-sm">Client</p>
                    </div>
                    
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(client)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminClients;