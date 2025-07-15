import { useEffect, useState } from "react";
import axios from "axios";
import { Save, Video, Link, Image, CheckCircle, X, Upload } from "lucide-react";

const AdminPromo = () => {
  const [promo, setPromo] = useState({ title: "", url: "", background: null });
  const [preview, setPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const { data } = await axios.get("/api/tatto/promo");
        setPromo(data);
        setPreview(`${import.meta.env.VITE_API_URL}${data.background}`);
      } catch (error) {
        console.error("Failed to fetch promo:", error);
      }
    };
    fetchPromo();
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fd = new FormData();
    fd.append("title", promo.title);
    fd.append("url", promo.url);
    if (promo.background instanceof File) {
      fd.append("background", promo.background);
    }

    try {
      const { data } = await axios.post("/api/tatto/promo", fd);
      setPromo(data);
      if (data.background) {
        setPreview(`${import.meta.env.VITE_API_URL}${data.background}`);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update promo:", error);
      alert("Failed to update promo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPromo({ ...promo, background: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const removePreview = () => {
    setPreview(null);
    setPromo({ ...promo, background: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            Promo Video Management
          </h1>
          <p className="text-gray-600">Configure your promotional video settings and background image</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              Promo Configuration
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Video className="w-4 h-4 inline mr-1" />
                Promo Title
              </label>
              <input
                type="text"
                value={promo.title}
                onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                placeholder="Enter promotional video title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4 inline mr-1" />
                Video URL
              </label>
              <input
                type="text"
                value={promo.url}
                onChange={(e) => setPromo({ ...promo, url: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Image className="w-4 h-4 inline mr-1" />
                Background Image
              </label>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    id="background-upload"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {preview && (
                  <div className="relative inline-block">
                    <div className="relative overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={preview}
                        alt="Background preview"
                        className="w-full max-w-md h-48 object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removePreview}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handlePromoSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Promo Configuration
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {(promo.title || promo.url) && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Preview
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {promo.title && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Title:</span>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{promo.title}</p>
                </div>
              )}

              {promo.url && (
                <div>
                  <span className="text-sm font-medium text-gray-500 mb-3 block">Video Preview:</span>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={getYouTubeEmbedUrl(promo.url)}
                      title={promo.title || "Promo Video"}
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 break-all">Source: {promo.url}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-4">Promo configuration has been saved successfully.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromo;
