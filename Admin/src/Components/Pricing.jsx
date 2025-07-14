import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Save,
  Trash2,
  Upload,
  Edit3,
  X,
  CheckCircle
} from "lucide-react";

const AdminPricing = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", price: "" });
  const [bgImage, setBgImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");

  const fetchPricing = async () => {
    try {
      const res = await axios.get("/api/tatto/pricing");
      const data = res.data;
      setItems(data.items || []);
      setBgImage(data.img || null);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", price: "" });
    setEditingIndex(null);
  };

  const handleAddOrEdit = () => {
    if (!formData.title || !formData.price) return;
    const updatedItems = [...items];
    if (editingIndex !== null) {
      updatedItems[editingIndex] = { ...formData };
    } else {
      updatedItems.push({ ...formData });
    }
    setItems(updatedItems);
    resetForm();
  };

  const handleEdit = (item, index) => {
    setFormData({ title: item.title, price: item.price });
    setEditingIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setMessage("Item deleted");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSaveAll = async () => {
    try {
      const data = new FormData();
      if (bgImage instanceof File) {
        data.append("img", bgImage);
      }
      data.append("items", JSON.stringify(items));
      await axios.put("/api/tatto/pricing", data);
      fetchPricing();
      resetForm();
      setMessage("Pricing saved");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin: Pricing Section
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Image Upload */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Section Background Image
            </h2>

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg border border-gray-300"
              />
            ) : typeof bgImage === "string" ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${bgImage}`}
                alt="Current Background"
                className="w-full rounded-lg border border-gray-300"
              />
            ) : (
              <p className="text-gray-500 text-sm">No background image set.</p>
            )}

            <label className="block w-full">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-400 rounded-md text-blue-600 cursor-pointer hover:bg-blue-50 transition">
                <Upload size={18} />
                <span>Upload Image</span>
              </div>
            </label>
          </div>

          {/* Right: Items + Form */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
            {/* Form */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {editingIndex !== null ? "Edit Item" : "Add New Item"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="title"
                  placeholder="Service Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="p-3 rounded-md border border-gray-300 w-full"
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Price ($)"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="p-3 rounded-md border border-gray-300 w-full"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddOrEdit}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
                {editingIndex !== null && (
                  <button
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Pricing Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead className="text-gray-600 bg-gray-100">
                  <tr>
                    <th className="p-2">Title</th>
                    <th className="p-2">Price ($)</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="border-t text-gray-700">
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">${item.price}</td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item, idx)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center p-4 text-gray-400">
                        No pricing items yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                onClick={handleSaveAll}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition"
              >
                <Save size={18} className="inline mr-2" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>

        {/* Floating Notification */}
        {message && (
          <div className="fixed bottom-6 right-6 bg-white border border-green-400 text-green-700 px-5 py-3 rounded-lg shadow-md flex items-center gap-2 animate-bounce-in">
            <CheckCircle size={20} />
            <span>{message}</span>
            <X
              size={18}
              className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setMessage("")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPricing;
