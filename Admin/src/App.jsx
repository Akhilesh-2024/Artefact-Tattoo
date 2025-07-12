import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Set base URL for axios
axios.defaults.baseURL = "http://localhost:5001"; // Adjust this to your backend URL

const App = () => {
  useEffect(() => {
    // Check for token on app load and set axios header
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
                
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;