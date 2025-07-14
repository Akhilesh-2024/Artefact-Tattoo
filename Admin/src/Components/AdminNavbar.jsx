import { useEffect, useState } from "react";
import axios from "axios";
import {
  Upload,
  Plus,
  Trash2,
  ChevronDown,
  Save,
  Menu,
  Link,
  Image,
  Settings,
} from "lucide-react";

const AdminNavbar = () => {
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    axios
      .get("/api/tatto/navbar")
      .then((res) => {
        setNavItems(res.data.navItems || []);
        if (res.data.logo) {
          setPreview(`${import.meta.env.VITE_API_URL}${res.data.logo}`);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        showNotification("Failed to load navbar data", "error");
      });
  }, []);

  const handleAddNavItem = () => {
    setNavItems([
      ...navItems,
      {
        label: "",
        path: "/",
        dropdown: false,
        subItems: [],
      },
    ]);
  };

  const handleNavItemChange = (index, key, value) => {
    const updated = [...navItems];
    updated[index][key] = value;
    setNavItems(updated);
  };

  const handleDeleteNavItem = (index) => {
    const updated = [...navItems];
    updated.splice(index, 1);
    setNavItems(updated);
    showNotification("Navigation item deleted");
  };

  const handleAddSubItem = (index) => {
    const updated = [...navItems];
    updated[index].subItems = updated[index].subItems || [];
    updated[index].subItems.push({ label: "", path: "/" });
    setNavItems(updated);
  };

  const handleSubItemChange = (parentIndex, subIndex, key, value) => {
    const updated = [...navItems];
    updated[parentIndex].subItems[subIndex][key] = value;
    setNavItems(updated);
  };

  const handleDeleteSubItem = (parentIndex, subIndex) => {
    const updated = [...navItems];
    updated[parentIndex].subItems.splice(subIndex, 1);
    setNavItems(updated);
    showNotification("Sub item deleted");
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (logo) formData.append("logo", logo);
    formData.append("navItems", JSON.stringify(navItems));

    try {
      await axios.post("/api/tatto/navbar", formData);
      showNotification("Navbar updated successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      showNotification("Failed to update navbar", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === "error" ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Navbar Configuration
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage your website navigation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Logo section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Image className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Logo
                </h2>
              </div>

              <div className="space-y-4">
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Logo Preview"
                      className="w-full h-32 sm:h-40 object-contain bg-blue-400 rounded-lg border border-gray-200 shadow-sm p-4"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 sm:h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-500">
                        No logo
                      </p>
                    </div>
                  </div>
                )}

                <label className="block">
                  <div className="flex items-center justify-center w-full h-10 sm:h-12 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Upload className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">
                        Upload
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Guidelines:</p>
                  <ul className="space-y-1">
                    <li>• Recommended: 200x60px</li>
                    <li>• Max size: 2MB</li>
                    <li>• PNG, JPG, SVG supported</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Nav items section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Navigation Items
                  </h2>
                </div>
                <button
                  onClick={handleAddNavItem}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="space-y-3 max-h-96 sm:max-h-[700px] overflow-y-auto">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) =>
                          handleNavItemChange(index, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={item.path}
                          onChange={(e) =>
                            handleNavItemChange(index, "path", e.target.value)
                          }
                          placeholder="/path"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.dropdown}
                            onChange={(e) =>
                              handleNavItemChange(
                                index,
                                "dropdown",
                                e.target.checked
                              )
                            }
                          />
                          <span className="text-sm text-gray-700">
                            <ChevronDown className="inline h-4 w-4" /> Dropdown
                          </span>
                        </label>
                        <button
                          onClick={() => handleDeleteNavItem(index)}
                          className="text-red-600 hover:bg-red-50 rounded-md p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {item.dropdown && (
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700">
                            Sub Items
                          </h4>
                          <button
                            onClick={() => handleAddSubItem(index)}
                            className="flex items-center space-x-1 text-blue-600 text-xs hover:bg-blue-50 px-2 py-1 rounded"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Add</span>
                          </button>
                        </div>
                        <div className="space-y-2">
                          {item.subItems?.map((sub, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2"
                            >
                              <input
                                type="text"
                                value={sub.label}
                                onChange={(e) =>
                                  handleSubItemChange(
                                    index,
                                    subIndex,
                                    "label",
                                    e.target.value
                                  )
                                }
                                placeholder="Sub label"
                                className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                              />
                              <input
                                type="text"
                                value={sub.path}
                                onChange={(e) =>
                                  handleSubItemChange(
                                    index,
                                    subIndex,
                                    "path",
                                    e.target.value
                                  )
                                }
                                placeholder="/sub-path"
                                className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                              />
                              <button
                                onClick={() =>
                                  handleDeleteSubItem(index, subIndex)
                                }
                                className="text-red-600 hover:bg-red-50 rounded-md p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save className="h-4 w-4" />
            <span className="font-medium">Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
