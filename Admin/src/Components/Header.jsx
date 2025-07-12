import React from 'react';
import { Menu, X, Bell, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Clear axios header
    delete axios.defaults.headers.common["Authorization"];
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-100 block md:hidden"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-900 ml-4">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-56"
          />
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">John Doe</span>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-600"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;