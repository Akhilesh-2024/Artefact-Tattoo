import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Trash2,
  Loader2,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  // New state for enhanced features
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "subscribedAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get("/api/tatto/subscribe");
      setSubscribers(res.data);
    } catch (err) {
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?"))
      return;

    try {
      setDeletingId(id);
      await axios.delete(`/api/tatto/subscribe/${id}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setMessage("Subscriber deleted successfully.");
    } catch (err) {
      console.error("Failed to delete subscriber", err);
      setMessage("Failed to delete subscriber.");
    } finally {
      setDeletingId(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Filtered and sorted data
  const filteredAndSortedSubscribers = useMemo(() => {
    let filtered = subscribers.filter((subscriber) => {
      const matchesSearch = subscriber.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter
        ? new Date(subscriber.subscribedAt).toDateString() ===
          new Date(dateFilter).toDateString()
        : true;
      return matchesSearch && matchesDate;
    });

    // Sort data
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "subscribedAt") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [subscribers, searchTerm, sortConfig, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedSubscribers.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscribers = filteredAndSortedSubscribers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const exportToExcel = () => {
    const headers = ["Email", "Subscribed At"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedSubscribers.map(
        (s) => `${s.email},${new Date(s.subscribedAt).toLocaleString()}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "subscribers.csv";
    link.click();
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown size={16} className="text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={16} className="text-blue-600" />
    ) : (
      <ArrowDown size={16} className="text-blue-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Subscriber Management
                </h1>
                <p className="text-gray-600">
                  Manage your newsletter subscribers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 px-4 py-2 rounded-xl">
                <span className="text-green-800 font-semibold">
                  {filteredAndSortedSubscribers.length} Total
                </span>
              </div>
              <button
                onClick={exportToExcel}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
              >
                <Download size={18} className="mr-2" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative flex-1 md:w-80">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-3 rounded-xl border transition-colors ${
                  showFilters
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown
                  size={16}
                  className={`ml-2 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Filter by Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setDateFilter("");
                      setCurrentPage(1);
                    }}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6">
            <div
              className={`p-4 rounded-xl flex items-center ${
                message.includes("successfully")
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {message.includes("successfully") ? (
                <CheckCircle className="text-green-600 mr-3" size={20} />
              ) : (
                <AlertCircle className="text-red-600 mr-3" size={20} />
              )}
              <span
                className={
                  message.includes("successfully")
                    ? "text-green-800"
                    : "text-red-800"
                }
              >
                {message}
              </span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader2
                  className="animate-spin mx-auto mb-4 text-blue-600"
                  size={40}
                />
                <p className="text-gray-600 text-lg">Loading subscribers...</p>
              </div>
            </div>
          ) : (
            <>
              {filteredAndSortedSubscribers.length === 0 ? (
                <div className="text-center py-20">
                  <Mail className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-500 text-lg">No subscribers found.</p>
                  {searchTerm || dateFilter ? (
                    <p className="text-gray-400 mt-2">
                      Try adjusting your filters
                    </p>
                  ) : null}
                </div>
              ) : (
                <>
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                            <div className="flex items-center space-x-2">
                              <span>#</span>
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                            <button
                              onClick={() => handleSort("email")}
                              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                            >
                              <Mail size={16} />
                              <span>Email</span>
                              {getSortIcon("email")}
                            </button>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                            <button
                              onClick={() => handleSort("subscribedAt")}
                              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                            >
                              <Calendar size={16} />
                              <span>Subscribed At</span>
                              {getSortIcon("subscribedAt")}
                            </button>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paginatedSubscribers.map((s, index) => (
                          <tr
                            key={s._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {startIndex + index + 1}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                  <Mail className="text-blue-600" size={16} />
                                </div>
                                <span className="text-gray-900 font-medium">
                                  {s.email}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(s.subscribedAt).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleDelete(s._id)}
                                disabled={deletingId === s._id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              >
                                {deletingId === s._id ? (
                                  <Loader2 className="animate-spin" size={18} />
                                ) : (
                                  <Trash2 size={18} />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-gray-50 px-6 py-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Showing {startIndex + 1} to{" "}
                          {Math.min(
                            startIndex + itemsPerPage,
                            filteredAndSortedSubscribers.length
                          )}{" "}
                          of {filteredAndSortedSubscribers.length} subscribers
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft size={18} />
                          </button>

                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubscribers;
