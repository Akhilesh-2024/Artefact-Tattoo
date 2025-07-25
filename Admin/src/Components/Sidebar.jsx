import React, { useState } from 'react';
import {
  Home, Users, FileText, Inbox, BarChart3, Settings, User,
  Star, Send, Mail, Archive, Trash, Menu, X, Shield, Info,
  Workflow, Calendar, Briefcase, DollarSign, BookOpen, Image,
  Video, Building, ChevronDown, ChevronRight, Edit, Plus,
  List, MessageSquare, Eye, Upload, Globe, Phone, Share2,
  UserCheck, FileImage, PlayCircle, MessageCircle, Zap,
  Target, Award,
  File
} from 'lucide-react';

const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'theme', label: 'Theme', icon: Globe },
    {
      id: 'navbar',
      label: 'Navbar',
      icon: Menu,
    },
    {
      id: 'hero',
      label: 'Hero Section',
      icon: Shield,
      subItems: [
        { id: 'hero-main', label: 'Main Hero Content', icon: Edit },
        { id: 'hero-about', label: 'About Hero (subsection)', icon: Info },
        { id: 'hero-service', label: 'service Hero (subsection)', icon: Users }
      ]
    },
    {
      id: 'about',
      label: 'About Section',
      icon: Info,
    },
    {
      id: 'team',
      label: 'Team Section',
      icon: Users,
    },
    {
      id: 'services',
      label: 'Services Section',
      icon: Briefcase,
    },
    { id: 'pricing', label: 'Pricing Section', icon: DollarSign },
    { id: 'process', label: 'Process Section', icon: Workflow },
    { id: 'appointment', label: 'Appointment Form', icon: Calendar,
      subItems: [
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'appointment-content', label: 'Appointment Content', icon: Target }
      ],
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: BookOpen,
    },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'faq', label: 'Faq', icon: Eye },
    { id: 'aftercare', label: 'Aftercare', icon: UserCheck },
    {
      id: 'videos',
      label: 'Promo Video & Testimonials',
      icon: Video,
      subItems: [
        { id: 'videos-promo', label: 'Promo Video', icon: PlayCircle },
        { id: 'videos-testimonials', label: 'Testimonials', icon: MessageCircle }
      ]
    },
    { id: 'clients', label: 'Clients Section', icon: Building },
    {
      id: 'footer',
      label: 'Footer',
      icon: Archive,
      subItems: [
        { id: 'footer-content', label: 'Footer Content', icon: Edit },
        { id: 'footer-subscribers', label: 'Subscribers', icon: Inbox }
      ]
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Archive,
      subItems: [
        { id: 'contact-inbox', label: 'Inbox', icon: Inbox },
        { id: 'contact-content', label: 'Contact Content', icon: Edit }
      ]
    },
  ];

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleItemClick = (itemId) => {
    const mainSection = menuItems.find(item => item.id === itemId);
    if (mainSection?.subItems) toggleSection(itemId);
    onTabChange(itemId);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => onTabChange(activeTab)}
        />
      )}

      <div
        className={`
          fixed left-0 top-0 h-full bg-slate-100 transform transition-all duration-300 ease-out z-50 shadow-lg
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
          ${isExpanded ? 'w-72' : 'w-16'}
          flex flex-col
        `}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 p-4 border-b border-slate-200">
          <div className="flex justify-end">
            <button
              onClick={toggleExpanded}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors duration-200"
            >
              {isExpanded ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm opacity-90" />
            </div>
            {isExpanded && (
              <div className="text-center transition-opacity duration-300 delay-200">
                <p className="text-slate-700 font-medium text-sm">Admin Panel</p>
                <p className="text-slate-500 text-xs font-medium">Content Management</p>
              </div>
            )}
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeTab));
            const isSectionExpanded = expandedSections[item.id];

            return (
              <div key={item.id} className="flex flex-col">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    flex items-center gap-2 h-10 px-2 rounded-lg transition-all duration-200 group text-left w-full
                    ${isActive
                      ? 'bg-blue-100 border-r-4 border-blue-500 text-blue-700'
                      : 'hover:bg-slate-200 text-slate-700'
                    }
                  `}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Icon size={18} className={`${isActive ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-500'}`} />
                  </div>
                  {isExpanded && (
                    <>
                      <span className={`text-sm font-medium flex-1 ${isActive ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {item.label}
                      </span>
                      {item.subItems && (
                        <div className="w-4 h-4 flex items-center justify-center">
                          {isSectionExpanded
                            ? <ChevronDown size={14} className="text-slate-500" />
                            : <ChevronRight size={14} className="text-slate-500" />
                          }
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Sub Items */}
                {item.subItems && isSectionExpanded && isExpanded && (
                  <div className="ml-4 mt-1 border-l border-slate-200 pl-4">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;

                      return (
                        <button
                          key={subItem.id}
                          onClick={() => onTabChange(subItem.id)}
                          className={`
                            flex items-center gap-2 h-8 px-2 rounded-md transition-all duration-200 group text-left w-full mb-1
                            ${isSubActive
                              ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                              : 'hover:bg-slate-150 text-slate-600'
                            }
                          `}
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <SubIcon size={14} className={`${isSubActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-500'}`} />
                          </div>
                          <span className={`text-xs font-medium ${isSubActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-800'}`}>
                            {subItem.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
