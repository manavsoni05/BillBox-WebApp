import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-surface-container/30 relative">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        {/* Scrollable Layout Content */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-12 py-10">
          <div className="max-w-7xl mx-auto w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
