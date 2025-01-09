import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Home from '../Pages/Home';
import TopBar from './Top';
import Portfolio from '../Pages/Portfolio';
import ViewPortfolio from '../Pages/ViewPortfolio';
import Service from '../Pages/Service';
import Testimonials from '../Pages/Testimonials';
import Carrier from '../Pages/Carrier';
import TeamMemberForm from '../Pages/Team';
import ViewTestimonial from '../Pages/ViewTestimonial';
import ViewService from '../Pages/ViewServices';
import Team from '../Pages/Team';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
            
            <Route path="/team" element={<Team/>}/>
            <Route path="/carrier" element={<Carrier/>}/>
            <Route path="/view-testimonial" element={<ViewTestimonial />} />
            <Route path="/testimonials" element={<Testimonials/>}/>
            <Route path="/view-services" element={<ViewService/>}/>
            <Route path="/services" element={<Service/>}/>
            <Route path="/portfolio" element={<Portfolio/>} />
            <Route path="/view-portfolio" element={<ViewPortfolio />} />
            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
