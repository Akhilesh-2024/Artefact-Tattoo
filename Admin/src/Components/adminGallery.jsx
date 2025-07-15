import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, Upload, Video, ImageIcon, Save, CheckCircle, X, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const AdminGallery = () => {
  const API = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [videoData, setVideoData] = useState({ 
    image: null, 
    videoUrl: "", 
    title: "" 
  });
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

  const fetchGallery = async () => {
    try {
      const res = await axios.get("/api/tatto/gallery");
      const all = res.data;
      setImages(all.filter(i => i.type === "image").sort((a, b) => a.imageOrder - b.imageOrder));
      setVideos(all.filter(i => i.type === "video").sort((a, b) => a.videoOrder - b.videoOrder));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please select an image");
    const form = new FormData();
    form.append("type", "image");
    form.append("image", imageFile);
    try {
      await axios.post("/api/tatto/gallery", form);
      setImageFile(null);
      fetchGallery();
      addNotification("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    }
  };

  const handleVideoUpload = async () => {
    const { image, videoUrl, title } = videoData;
    if (!image) return alert("Please select a thumbnail image");
    if (!videoUrl) return alert("Please enter a YouTube URL");
    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      return alert("Please enter a valid YouTube URL");
    }

    const form = new FormData();
    form.append("type", "video");
    form.append("image", image);
    form.append("videoUrl", videoUrl);
    form.append("title", title);
    
    try {
      await axios.post("/api/tatto/gallery", form);
      setVideoData({ image: null, videoUrl: "", title: "" });
      fetchGallery();
      addNotification("Video added successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload video");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`/api/tatto/gallery/${id}`);
      fetchGallery();
      addNotification("Item deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item");
    }
  };

  const updateOrders = async (items, type) => {
    try {
      await axios.put("/api/tatto/gallery/order", {
        items: items.map((item, index) => ({
          _id: item._id,
          order: index
        })),
        itemType: type
      });
      fetchGallery();
      addNotification("Order updated successfully!");
    } catch (err) {
      console.error("Order update error:", err);
      alert("Failed to update order");
    }
  };

  const onDragEnd = (result, type) => {
    if (!result.destination) return;

    const items = type === "image" ? [...images] : [...videos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (type === "image") {
      setImages(items);
    } else {
      setVideos(items);
    }

    updateOrders(items, type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Gallery Management</h1>
          <p className="text-slate-600">Upload, organize, and manage your gallery content</p>
        </div>

        {/* Image Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <ImageIcon size={28} /> Image Gallery
            </h2>
            <p className="text-purple-100 mt-1">Manage your image collection</p>
          </div>
          
          <div className="p-6">
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
                <button
                  onClick={handleImageUpload}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                >
                  <Upload size={20} /> Upload Image
                </button>
              </div>
            </div>

            <DragDropContext onDragEnd={(result) => onDragEnd(result, "image")}>
              <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {images.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                              snapshot.isDragging ? 'shadow-2xl scale-105' : 'hover:shadow-xl hover:scale-102'
                            }`}
                          >
                            <div 
                              {...provided.dragHandleProps}
                              className="absolute top-2 left-2 z-10 bg-white/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical size={16} className="text-slate-600" />
                            </div>
                            
                            <div className="relative overflow-hidden">
                              <img
                                src={`${API}${item.imageUrl}`}
                                alt=""
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                    Position {item.imageOrder + 1}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all transform hover:scale-110 shadow-md"
                                  title="Delete"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Video size={28} /> Video Gallery
            </h2>
            <p className="text-red-100 mt-1">Manage your video collection</p>
          </div>
          
          <div className="p-6">
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setVideoData({ ...videoData, image: e.target.files[0] })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    YouTube URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/..."
                    value={videoData.videoUrl}
                    onChange={(e) =>
                      setVideoData({ ...videoData, videoUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Video title"
                    value={videoData.title}
                    onChange={(e) =>
                      setVideoData({ ...videoData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleVideoUpload}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg font-medium"
                  >
                    <Save size={20} /> Add Video
                  </button>
                </div>
              </div>
            </div>

            <DragDropContext onDragEnd={(result) => onDragEnd(result, "video")}>
              <Droppable droppableId="videos" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {videos.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                              snapshot.isDragging ? 'shadow-2xl scale-105' : 'hover:shadow-xl hover:scale-102'
                            }`}
                          >
                            <div 
                              {...provided.dragHandleProps}
                              className="absolute top-2 left-2 z-10 bg-white/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical size={16} className="text-slate-600" />
                            </div>
                            
                            <div className="relative overflow-hidden">
                              <img
                                src={`${API}${item.imageUrl}`}
                                alt={item.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 text-white rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform">
                                  <Video size={24} />
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h3 className="font-semibold text-slate-800 truncate mb-2">
                                {item.title}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                  Position {item.videoOrder + 1}
                                </span>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all transform hover:scale-110 shadow-md"
                                  title="Delete"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;