import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import DashboardContent from '../Components/DashboardContent';
import TeamContent from '../Components/TeamContent';
import AdminHeroBanner from '../Components/HeroBanner';
import AdminAbout from '../Components/About';
import AdminNavbar from '../Components/AdminNavbar';
import AdminProcess from '../Components/process';
import AdminServices from '../Components/service';
import AdminPricing from '../Components/Pricing';
import AdminAppointmentContent from '../Components/AdminAppointmentContent';
import AdminAppointmentBookings from '../Components/AppointmentBookings';
import AdminBlog from '../Components/AdminBlog';
import AdminPromo from '../Components/AdminPromo';
import AdminTestimonials from '../Components/adminTestimonials';
import AdminClients from '../Components/AdminClients';
import AdminFooterPanel from '../Components/AdminFooter';
import AdminSubscribers from '../Components/AdminSubscribers';
import AdminGallery from '../Components/adminGallery';
import AdminFaqsPanel from '../Components/AdminFaqs';
import AdminAftercare from '../Components/AfterCare';
import AdminContactInbox from '../Components/AdminContactInbox';
import AdminContactContent from '../Components/AdminContactContent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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
      case 'dashboard':
        return <DashboardContent />;
      // Navbar Section
      case 'navbar':
        return <AdminNavbar />;

      // Hero Section
      case 'hero':
        return <AdminHeroBanner />;
      case 'hero-main':
        return <AdminHeroBanner />;
      case 'hero-about':
        return <DashboardContent />;
      case 'hero-service':
        return <DashboardContent />;

      // About Section
      case 'about':
        return <AdminAbout />;

      // Team Section
      case 'team':
        return <TeamContent />;

      // Services Section
      case 'services':
        return <AdminServices />;

      // Pricing Section
      case 'pricing':
        return <AdminPricing />;

      // Process Section
      case 'process':
        return <AdminProcess />;

      // Appointment Section
      case 'appointment':
        return <AdminAppointmentBookings />;
        case 'appointments':
        return <AdminAppointmentBookings />;
      case 'appointment-content':
        return <AdminAppointmentContent />;

      // Blog Section
      case 'blog':
        return <AdminBlog />;

      // Gallery Section
      case 'gallery':
        return <AdminGallery />;

      case 'faq':
        return <AdminFaqsPanel />;

      case 'aftercare':
        return <AdminAftercare />;

      // Videos Section
      case 'videos':
        return <AdminPromo />;
      case 'videos-promo':
        return <AdminPromo />;
      case 'videos-testimonials':
        return <AdminTestimonials />;

      // Clients Section
      case 'clients':
        return <AdminClients />;

      // Footer Section
      case 'footer':
        return <AdminFooterPanel />;
        case 'footer-content':
        return <AdminFooterPanel />;
      case 'footer-subscribers':
        return <AdminSubscribers />;

      // Contact Section
      case 'contact':
        return <AdminContactInbox />;
        case 'contact-inbox':
        return <AdminContactInbox />;
      case 'contact-content':
        return <AdminContactContent />;

      // Default fallback
      default:
        return <DashboardContent />;
    }
  };

  // Function to get page title based on active tab
  const getPageTitle = () => {
    const titleMap = {
      'dashboard': 'Dashboard',
      // Navbar
      'navbar': 'Navbar',

      // Hero Section
      'hero': 'Hero Section',
      'hero-main': 'Main Hero Content',
      'hero-about': 'About Hero (subsection)',
      'hero-service': 'Team Service (subsection)',

      // About Section
      'about': 'About Section',

      // Team Section
      'team': 'Team Section',

      // Services Section
      'services': 'Services Section',

      // Pricing Section
      'pricing': 'Pricing Section',

      // Process Section
      'process': 'Process Section',

      // Appointment Section
      'appointment': 'Appointment Form',
      'appointments': 'Appointments',
      'appointment-content': 'Appointment-Content',

      // Blog Section
      'blog': 'Blog',

      // Gallery Section
      'gallery': 'Gallery',

      'faq': 'Faqs',

      'aftercare': 'Aftercare',

      // Videos Section
      'videos': 'Promo Video & Testimonials',
      'videos-promo': 'Promo Video',
      'videos-testimonials': 'Testimonials',

      // Clients Section
      'clients': 'Clients Section',

      // Footer Section
      'footer': 'Footer',
      'footer-content': 'Footer Content',
      'footer-subscribers': 'Subscribers'
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