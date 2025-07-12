import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import UsersContent from '../components/UsersContent';
import ReportsContent from '../components/ReportsContent';
import SettingsContent from '../components/SettingsContent';

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
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent />;
      case 'reports':
        return <ReportsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <main className="flex-1 md:ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;