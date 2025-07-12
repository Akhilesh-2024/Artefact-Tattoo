import React from 'react';
import { Home, Users, Settings, FileText } from 'lucide-react';

const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => onTabChange(activeTab)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-auto
      `} style={{ minHeight: '100vh' }}>
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">MyApp</h2>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors
                  ${activeTab === item.id ? 'bg-gray-800 border-r-4 border-blue-500' : ''}
                `}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;