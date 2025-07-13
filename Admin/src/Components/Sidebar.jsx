import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Inbox, 
  BarChart3, 
  Settings, 
  User,
  Star,
  Send,
  Mail,
  Archive,
  Trash,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const primaryItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'Team', label: 'Team', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const secondaryItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash },
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
        fixed left-0 top-0 h-full bg-slate-100 transform transition-all duration-300 ease-out z-50 shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-auto
        ${isExpanded ? 'w-72' : 'w-16'}
      `} style={{ minHeight: '100vh' }}>
        
        {/* Header */}
        <header className="flex flex-col gap-2 p-4 border-b border-slate-200">
          {/* Toggle Button */}
          <div className="flex justify-end">
            <button
              onClick={toggleExpanded}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors duration-200 hover:outline hover:outline-2 hover:outline-blue-500"
            >
              {isExpanded ? (
                <X size={18} className="text-slate-600" />
              ) : (
                <Menu size={18} className="text-slate-600" />
              )}
            </button>
          </div>

          {/* Logo/Profile Section */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm opacity-90"></div>
            </div>
            {isExpanded && (
              <div className="text-center transition-opacity duration-300 delay-200">
                <p className="text-slate-700 font-medium text-sm">MyApp</p>
                <p className="text-slate-500 text-xs font-medium">Admin</p>
              </div>
            )}
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          {/* Primary Section */}
          <div className="flex flex-col gap-0.5">
            {isExpanded && (
              <h2 className="text-xs uppercase font-medium text-slate-500 mb-2 transition-opacity duration-300 delay-200">
                General
              </h2>
            )}
            {primaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    flex items-center gap-2 h-9 px-2 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 text-left w-full
                    ${activeTab === item.id 
                      ? 'bg-blue-100 border-r-4 border-blue-500 text-blue-700' 
                      : 'hover:bg-slate-200 text-slate-700'
                    }
                  `}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <Icon 
                      size={18} 
                      className={`
                        transition-colors duration-200
                        ${activeTab === item.id 
                          ? 'text-blue-600' 
                          : 'text-slate-600 group-hover:text-blue-500'
                        }
                      `} 
                    />
                  </div>
                  {isExpanded && (
                    <span className={`
                      text-sm font-medium transition-colors duration-200
                      ${activeTab === item.id 
                        ? 'text-blue-700' 
                        : 'text-slate-700 group-hover:text-slate-900'
                      }
                    `}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Secondary Section */}
          <div className="flex flex-col gap-0.5 mt-4">
            {isExpanded && (
              <h2 className="text-xs uppercase font-medium text-slate-500 mb-2 transition-opacity duration-300 delay-200">
                Other
              </h2>
            )}
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    flex items-center gap-2 h-9 px-2 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 text-left w-full
                    ${activeTab === item.id 
                      ? 'bg-blue-100 border-r-4 border-blue-500 text-blue-700' 
                      : 'hover:bg-slate-200 text-slate-700'
                    }
                  `}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <Icon 
                      size={18} 
                      className={`
                        transition-colors duration-200
                        ${activeTab === item.id 
                          ? 'text-blue-600' 
                          : 'text-slate-600 group-hover:text-blue-500'
                        }
                      `} 
                    />
                  </div>
                  {isExpanded && (
                    <span className={`
                      text-sm font-medium transition-colors duration-200
                      ${activeTab === item.id 
                        ? 'text-blue-700' 
                        : 'text-slate-700 group-hover:text-slate-900'
                      }
                    `}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

      </div>
    </>
  );
};

export default Sidebar;