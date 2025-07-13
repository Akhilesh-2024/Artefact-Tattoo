import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, Users, Trash2, Upload, Eye, Pencil } from "lucide-react";

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
  const [editingMember, setEditingMember] = useState(null); // New

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
      if (editingMember) {
        await axios.put(`/api/tatto/team/${editingMember._id}`, data);
      } else {
        await axios.post("/api/tatto/team", data);
      }

      // Reset
      setFormData({ name: "", subname: "", info: "" });
      setFile(null);
      setPreview(null);
      setEditingMember(null);
      fetchTeam();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      subname: member.subname,
      info: member.info,
    });
    setPreview(`http://localhost:5001${member.img}`);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to form
  };

  const cancelEdit = () => {
    setEditingMember(null);
    setFormData({ name: "", subname: "", info: "" });
    setFile(null);
    setPreview(null);
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Management</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingMember ? "Edit Member" : "Add New Member"}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border" placeholder="Enter full name" />
                  <input type="text" name="subname" required value={formData.subname} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border" placeholder="e.g., Tattoo Artist" />
                  <textarea name="info" required rows="4" value={formData.info} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border" placeholder="Brief description..." />
                  <div>
                    <label className="block text-sm font-semibold mb-2">Profile Picture</label>
                    <div className="relative">
                      <input type="file" name="img" accept="image/*" onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-gray-50">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">Click to upload</span> or drag
                          </p>
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
                      <div className="w-full h-64 flex items-center justify-center overflow-hidden">
                        <img src={preview} alt="Preview" className="object-contain max-h-full" />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button type="submit" disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold">
                      {loading ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                    </button>
                    {editingMember && (
                      <button type="button" onClick={cancelEdit}
                        className="bg-gray-200 text-gray-700 px-4 rounded-lg font-semibold">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Team Members */}
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
                  <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
                    <span className="font-semibold">{teamList.length} Members</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {loading ? (
                  <div className="text-center">Loading team members...</div>
                ) : teamList.length === 0 ? (
                  <div className="text-center text-gray-500">No team members yet.</div>
                ) : (
                  teamList.map((member) => (
                    <div key={member._id} className="bg-gray-50 rounded-xl p-6 border hover:shadow-lg">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img src={`http://localhost:5001${member.img}`} alt={member.name}
                            className="w-24 h-24 object-cover rounded-xl border-4 border-white shadow-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold">{member.name}</h3>
                              <p className="text-blue-600 mb-2">{member.subname}</p>
                              <p className="text-gray-700">{member.info}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEditClick(member)}
                                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                title="Edit">
                                <Pencil className="w-5 h-5" />
                              </button>
                              <button onClick={() => deleteMember(member._id)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                title="Delete">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
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
    </div>
  );
};

export default TeamContent;
