import React, { useState } from 'react';
import Header from '../components/Header';
import TeamContent from '../Components/TeamContent';
import DashboardContent from '../Components/DashboardContent';
import Sidebar from '../Components/Sidebar';

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
      case 'Team':
        return <TeamContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed header */}
      <div className="fixed top-0 w-full z-50">
        <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
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
