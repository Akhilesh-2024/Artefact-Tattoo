import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, Users, Trash2, Upload, Eye } from "lucide-react";

const TeamContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    subname: "",
    info: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/tatto/team");
      setTeamList(res.data);
    } catch (err) {
      console.error("Error fetching team:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img" && files.length > 0) {
      const selected = files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("subname", formData.subname);
    data.append("info", formData.info);
    if (file) data.append("img", file);

    try {
      await axios.post("/api/tatto/team", data);
      setFormData({ name: "", subname: "", info: "" });
      setFile(null);
      setPreview(null);
      fetchTeam();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`/api/tatto/team/${id}`);
      fetchTeam();
    } catch (err) {
      console.error("Failed to delete team member:", err);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Management</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build and manage your dream team with our intuitive interface
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Add New Member</h2>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position / Role</label>
                    <input
                      type="text"
                      name="subname"
                      required
                      value={formData.subname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="e.g., Senior Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="info"
                      required
                      rows="4"
                      value={formData.info}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                      placeholder="Brief description about the team member..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                    <div className="relative">
                      <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {preview && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Preview</span>
                      </div>
                      <div className="w-full h-64 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={preview}
                          alt="Preview"
                          className="object-contain max-h-full"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding Member...
                      </div>
                    ) : (
                      "Add Team Member"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Team Members</h2>
                  </div>
                  <div className="bg-white bg-opacity-20 text-center rounded-full px-4 py-2">
                    <span className="font-semibold">{teamList.length} Members</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">Loading team members...</span>
                  </div>
                ) : teamList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No team members yet</h3>
                    <p className="text-gray-500">Add your first team member to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {teamList.map((member) => (
                      <div
                        key={member._id}
                        className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="flex-shrink-0">
                            {member.img ? (
                              <img
                                src={`http://localhost:5001${member.img}`}
                                alt={member.name}
                                className="w-24 h-24 object-cover rounded-xl border-4 border-white shadow-lg"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                              style={{ display: member.img ? "none" : "flex" }}
                            >
                              {member.name.charAt(0)}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.subname}</p>
                                <p className="text-gray-700">{member.info}</p>
                              </div>

                              <button
                                onClick={() => deleteMember(member._id)}
                                className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Delete member"
                              >
                                <Trash2 className="w-5 h-5" />
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

export default TeamContent;
