import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  User,
  Phone,
  MessageSquare,
  Archive,
  Inbox,
  Star,
  MoreHorizontal,
} from "lucide-react";

const AdminContactInbox = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const limit = 10;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `/api/tatto/contact/messages?page=${page}&limit=${limit}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tatto/contact/messages/${id}`);
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredAndSortedMessages = messages
    .filter((msg) => {
      const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === "all") return matchesSearch;
      if (filterBy === "recent") {
        const isRecent = new Date(msg.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);
        return matchesSearch && isRecent;
      }
      if (filterBy === "hasPhone") {
        return matchesSearch && msg.phone && msg.phone.trim() !== "";
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortBy === "createdAt") {
        const comparison = new Date(aValue) - new Date(bValue);
        return sortOrder === "asc" ? comparison : -comparison;
      }
      
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredAndSortedMessages.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedMessages = filteredAndSortedMessages.slice(startIndex, startIndex + limit);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getMessagePreview = (message) => {
    return message.length > 100 ? message.substring(0, 100) + "..." : message;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Inbox className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Contact Inbox</h1>
                  <p className="text-gray-500 text-sm">{messages.length} total messages</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {filteredAndSortedMessages.length} filtered
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="createdAt">Date</option>
                  <option value="name">Name</option>
                  <option value="subject">Subject</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "All Messages", count: messages.length },
                    { value: "recent", label: "Recent (24h)", count: messages.filter(m => new Date(m.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length },
                    { value: "hasPhone", label: "With Phone", count: messages.filter(m => m.phone && m.phone.trim() !== "").length },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setFilterBy(filter.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filterBy === filter.value
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-100">
            {paginatedMessages.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No messages found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              paginatedMessages.map((msg, index) => (
                <div
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className="group relative p-6 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {msg.name}
                          </h3>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm truncate">{msg.email}</span>
                          {msg.phone && (
                            <>
                              <span className="text-gray-500 text-sm">•</span>
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <Phone className="w-3 h-3" />
                                <span className="truncate">{msg.phone}</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="mb-2">
                          <p className="font-medium text-gray-800 mb-1">
                            {msg.subject}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {getMessagePreview(msg.message)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(msg.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(msg);
                        }}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg._id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + limit, filteredAndSortedMessages.length)} of {filteredAndSortedMessages.length} messages
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            page === pageNum
                              ? "bg-indigo-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-2 text-gray-500">...</span>
                        <button
                          onClick={() => setPage(totalPages)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            page === totalPages
                              ? "bg-indigo-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Message Details</h2>
                    <p className="text-indigo-100 text-sm">{selectedMessage.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Name</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedMessage.name}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedMessage.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Phone</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{selectedMessage.phone || "Not provided"}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Date</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{formatDate(selectedMessage.createdAt)}</p>
                  </div>
                </div>

                {/* Subject */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Subject</span>
                  </div>
                  <p className="text-blue-900 font-semibold">{selectedMessage.subject}</p>
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Message</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-200">
                  <Clock className="w-4 h-4" />
                  <span>Received on {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactInbox;