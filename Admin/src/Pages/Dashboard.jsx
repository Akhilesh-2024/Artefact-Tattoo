import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../Components/Sidebar';
import DashboardContent from '../Components/DashboardContent';
import TeamContent from '../Components/TeamContent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('navbar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    // For now, all routes will show DashboardContent except team
    // You can replace these with actual components as you create them
    switch (activeTab) {
      // Navbar Section
      case 'navbar':
      case 'navbar-links':
      case 'navbar-logo':
        return <DashboardContent />;

      // Hero Section
      case 'hero':
      case 'hero-main':
      case 'hero-about':
      case 'hero-team':
        return <DashboardContent />;

      // About Section
      case 'about':
      case 'about-content':
      case 'about-images':
        return <DashboardContent />;

      // Team Section
      case 'team':
        return <TeamContent />;
      case 'team-members':
        return <TeamContent />;
      case 'team-images':
        return <DashboardContent />;

      // Services Section
      case 'services':
      case 'services-list':
      case 'services-details':
        return <DashboardContent />;

      // Pricing Section
      case 'pricing':
        return <DashboardContent />;

      // Process Section
      case 'process':
        return <DashboardContent />;

      // Appointment Section
      case 'appointment':
        return <DashboardContent />;

      // Blog Section
      case 'blog':
      case 'blog-posts':
      case 'blog-categories':
        return <DashboardContent />;

      // Gallery Section
      case 'gallery':
        return <DashboardContent />;

      // Videos Section
      case 'videos':
      case 'videos-promo':
      case 'videos-testimonials':
        return <DashboardContent />;

      // Clients Section
      case 'clients':
        return <DashboardContent />;

      // Footer Section
      case 'footer':
      case 'footer-content':
      case 'footer-social':
        return <DashboardContent />;

      // Default fallback
      default:
        return <DashboardContent />;
    }
  };

  // Function to get page title based on active tab
  const getPageTitle = () => {
    const titleMap = {
      // Navbar
      'navbar': 'Navbar',
      'navbar-links': 'Edit Navigation Links',
      'navbar-logo': 'Logo & Branding',

      // Hero Section
      'hero': 'Hero Section',
      'hero-main': 'Main Hero Content',
      'hero-about': 'About Hero (subsection)',
      'hero-team': 'Team Hero (subsection)',

      // About Section
      'about': 'About Section',
      'about-content': 'About Content',
      'about-images': 'About Images',

      // Team Section
      'team': 'Team Section',
      'team-members': 'Team Members',
      'team-images': 'Team Images',

      // Services Section
      'services': 'Services Section',
      'services-list': 'Service List',
      'services-details': 'Service Details',

      // Pricing Section
      'pricing': 'Pricing Section',

      // Process Section
      'process': 'Process Section',

      // Appointment Section
      'appointment': 'Appointment Form',

      // Blog Section
      'blog': 'Blog',
      'blog-posts': 'Blog Posts',
      'blog-categories': 'Categories',

      // Gallery Section
      'gallery': 'Gallery',

      // Videos Section
      'videos': 'Promo Video & Testimonials',
      'videos-promo': 'Promo Video',
      'videos-testimonials': 'Testimonials',

      // Clients Section
      'clients': 'Clients Section',

      // Footer Section
      'footer': 'Footer',
      'footer-content': 'Footer Content',
      'footer-social': 'Social Links'
    };

    return titleMap[activeTab] || 'Dashboard';
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed header */}
      <div className="fixed top-0 w-full z-50">
        <Header 
          onToggleSidebar={handleToggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          pageTitle={getPageTitle()}
        />
      </div>

      {/* Content below header */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Main content scrolls */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;