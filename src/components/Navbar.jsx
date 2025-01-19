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
            <a href="/">
              <img src={Logo} alt="Betta Logo" />
            </a>
          </div>
          <ul className="links">
            <li>
              <a href="/" className="active">
                Home
              </a >
            </li>
            <li>
              <a href="/sobre" className="active">
                Saiba mais
              </a >
            </li>
          </ul>
          <a href="https://wa.me/5511931501833" className="action_btn">
            Contato
          </a>
          <div className="toggle_btn" onClick={toggleMenu}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>
        </div>

        <div className={`dropdown_menu ${isOpen ? 'open' : ''}`}>
          <li>
            <a href="/" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="/sobre" className="active">
              Saiba mais
            </a>
          </li>
          <li>
            <a href="https://wa.me/5511931501833" className="action_btn">
              Contato
            </a>
          </li>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
