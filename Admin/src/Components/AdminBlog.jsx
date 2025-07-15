import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Save, Trash2, Image, X, Edit3, Calendar, Tag, FileText } from "lucide-react";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "",
    date: new Date().toISOString().split("T")[0],
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/tatto/blog");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      const file = files[0];
      setFormData({ ...formData, img: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      blogData.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(`/api/tatto/blog/${editingId}`, blogData);
      } else {
        await axios.post("/api/tatto/blog", blogData);
      }
      setFormData({
        title: "",
        content: "",
        tag: "",
        date: new Date().toISOString().split("T")[0],
        img: null,
      });
      setPreview(null);
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      tag: blog.tag || "",
      date: blog.date.split("T")[0],
      img: null,
    });
    setEditingId(blog._id);
    setPreview(`${import.meta.env.VITE_API_URL}${blog.img}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tatto/blog/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      content: "",
      tag: "",
      date: new Date().toISOString().split("T")[0],
      img: null,
    });
    setPreview(null);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Administration</h1>
          <p className="text-gray-600">Create, edit, and manage your blog posts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {editingId ? "Edit Blog Post" : "Create New Post"}
                </h2>
                {editingId && (
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter blog title..."
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    placeholder="Write your blog content here..."
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={8}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4 inline mr-1" />
                      Tag
                    </label>
                    <input
                      type="text"
                      name="tag"
                      placeholder="e.g., Tattoo"
                      value={formData.tag}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Image className="w-4 h-4 inline mr-1" />
                    Featured Image
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {preview && (
                      <div className="relative inline-block">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setFormData({ ...formData, img: null });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={18} />
                  {editingId ? "Update Post" : "Create Post"}
                </button>
              </form>
            </div>
          </div>

          {/* Posts Section - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                All Blog Posts ({blogs.length})
              </h3>
              
              {blogs.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No blog posts yet. Create your first post!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="group border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-gray-50">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={`${import.meta.env.VITE_API_URL}${blog.img}`}
                            alt={blog.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {blog.title}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(blog.date).toLocaleDateString()}
                                </span>
                                {blog.tag && (
                                  <span className="flex items-center gap-1">
                                    <Tag className="w-4 h-4" />
                                    {blog.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {blog.content.slice(0, 120)}...
                              </p>
                            </div>
                            
                            <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(blog)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit post"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete post"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
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
  );
};

export default AdminBlog;