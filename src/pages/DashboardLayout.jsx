import React, { useState } from 'react';
import Ticket from '../components/Ticket.jsx';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import '../css/dashboard.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Inicia fechada em telas menores

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}>
        <Sidebar />
      </div>

      {/* Botão de alternância da sidebar */}
      <button 
        className={`toggle-sidebar-btn ${isSidebarOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      >
        <i className={`bi ${isSidebarOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      {/* Conteúdo principal */}
      <div className={`dashboard-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Outlet />
      </div>
      <Ticket />
    </div>
  );
};

export default DashboardLayout;
