import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase.jsx';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="custom-sidebar-content" aria-label="breadcrumb">
      <h2>B-board</h2>
      <ul className="custom-sidebar-links">
        <li className="sidebar-link">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="bi bi-house-door"></i> Início
          </NavLink>
        </li>
        <li className="sidebar-link">
          <NavLink to="/dashboard/perfil" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="bi bi-person"></i> Perfil
          </NavLink>
        </li>
        <li className="sidebar-link">
          <NavLink to="/dashboard/agenda" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="bi bi-calendar"></i> Agenda
          </NavLink>
        </li>
        <li className="sidebar-link">
          <NavLink to="/dashboard/bettaia" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="bi bi-robot"></i> Betta IA
          </NavLink>
        </li>
      </ul>
      <div className="custom-sidebar-buttons">
        <button className="custom-home-button" onClick={handleGoHome}>
          <i className="bi bi-house"></i> Página Inicial
        </button>
        <button className="custom-logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;