import { useEffect, useState } from "react";
import { X, Save, Plus, CheckCircle, HelpCircle, Edit3, Trash2, Hash } from "lucide-react";
import axios from 'axios'

const AdminFaqsPanel = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", order: 0 });
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      const res = await axios.get("/api/tatto/faqs");
      setFaqs(res.data);
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Create new FAQ
  const handleAddFaq = async () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      addNotification("Please fill in both question and answer", "error");
      return;
    }
    
    try {
      await axios.post("/api/tatto/faqs", newFaq);
      setNewFaq({ question: "", answer: "", order: 0 });
      fetchFaqs();
      addNotification("FAQ added successfully!");
    } catch (err) {
      console.error("Failed to add FAQ:", err);
      addNotification("Failed to add FAQ", "error");
    }
  };

  // Update existing FAQ
  const handleUpdateFaq = async (id, updatedFaq) => {
    if (!updatedFaq.question.trim() || !updatedFaq.answer.trim()) {
      addNotification("Please fill in both question and answer", "error");
      return;
    }
    
    try {
      await axios.put(`/api/tatto/faqs/${id}`, updatedFaq);
      fetchFaqs();
      addNotification("FAQ updated successfully!");
    } catch (err) {
      console.error("Failed to update FAQ:", err);
      addNotification("Failed to update FAQ", "error");
    }
  };

  // Delete FAQ
  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    
    try {
      await axios.delete(`/api/tatto/faqs/${id}`);
      fetchFaqs();
      addNotification("FAQ deleted successfully!");
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
      addNotification("Failed to delete FAQ", "error");
    }
  };

  // Handle inline changes
  const handleChange = (index, key, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][key] = value;
    setFaqs(updatedFaqs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
              notification.type === "success" 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            }`}
          >
            <CheckCircle size={20} />
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">FAQ Management</h1>
          <p className="text-slate-600">Create, edit, and organize frequently asked questions</p>
        </div>

        {/* Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Add new FAQ - Left Side */}
          <div className="lg:col-span-1 h-[510px]">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus size={24} /> Add New FAQ
                </h2>
                <p className="text-emerald-100 mt-1 text-sm">Create a new FAQ</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-white text-sm"
                      placeholder="What question do customers ask?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      rows={6}
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-white resize-none text-sm"
                      placeholder="Provide a comprehensive answer..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Hash size={14} className="inline mr-1" />
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={newFaq.order}
                      onChange={(e) => setNewFaq({ ...newFaq, order: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors bg-white text-sm"
                      placeholder="0"
                    />
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg font-medium text-sm"
                    onClick={handleAddFaq}
                  >
                    <Plus size={16} /> Add FAQ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Existing FAQs - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle size={24} /> Current FAQs
                </h2>
                <p className="text-blue-100 mt-1 text-sm">Edit existing questions</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {faqs.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle size={48} className="mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-500">No FAQs found. Add your first FAQ!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={faq._id}
                        className="bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Edit3 size={16} className="text-blue-600" />
                          <span className="text-xs font-semibold text-slate-600">FAQ #{index + 1}</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Question
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleChange(index, "question", e.target.value)}
                              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                              placeholder="Enter your question here..."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Answer
                            </label>
                            <textarea
                              rows={3}
                              value={faq.answer}
                              onChange={(e) => handleChange(index, "answer", e.target.value)}
                              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white resize-none text-sm"
                              placeholder="Provide a detailed answer..."
                            />
                          </div>
                          
                          <div className="flex items-end gap-3">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                <Hash size={12} className="inline mr-1" />
                                Order
                              </label>
                              <input
                                type="number"
                                value={faq.order}
                                onChange={(e) => handleChange(index, "order", e.target.value)}
                                className="w-20 px-2 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                                placeholder="Order"
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-md font-medium text-xs"
                                onClick={() => handleUpdateFaq(faq._id, faq)}
                              >
                                <Save size={14} /> Save
                              </button>
                              <button
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-md font-medium text-xs"
                                onClick={() => handleDeleteFaq(faq._id)}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
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

export default AdminFaqsPanel;