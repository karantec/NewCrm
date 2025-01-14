import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Home from '../Pages/Home';
import TopBar from './Top';
import NewsPortfolio from '../Pages/NewsPortfolio';
import BlogPortFolio from '../Pages/BlogPortFolio';


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* TopBar */}
        <TopBar toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
          <Routes>
            <Route path="home" element={<Home />} />
            
            <Route path="/news" element={<NewsPortfolio/>}/>
            <Route path="/blogs" element={<BlogPortFolio/>}/>
          
            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;