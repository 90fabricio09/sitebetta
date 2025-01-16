import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from '../assets/png.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav>
        <br />
        <div className="navbar">
          <div className="logo">
            <NavLink to="/">
              <img src={Logo} alt="Betta Logo" />
            </NavLink>
          </div>
          <ul className="links">
            <li>
              <NavLink to="/" className="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre" className="active">
                Saiba mais
              </NavLink>
            </li>
          </ul>
          <a href="https://wa.me/5511937350748" className="action_btn">
            Contato
          </a>
          <div className="toggle_btn" onClick={toggleMenu}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        </div>

        <div className={`dropdown_menu ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className="active">
              Saiba mais
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className="active">
              Chat IA
            </NavLink>
          </li>
          <li>
            <a href="https://wa.me/5511937350748" className="action_btn">
              Contato
            </a>
          </li>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
