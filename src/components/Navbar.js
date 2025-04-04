import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Импорт логотипа
import logo from '../assets/images/pltn-logo.png';

const Header = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Эффект случайного глитча в логотипе
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img 
            src={logo} 
            alt="PLTN.LAIR" 
            className={`logo ${glitchActive ? 'glitch-logo' : ''}`}
          />
          <h1 className="site-title">PLTN.<span className="lair-text">LAIR</span></h1>
        </Link>
        
        <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                <span className="nav-icon">🐀</span>
                <span className="nav-text">NEST</span>
              </Link>
            </li>
            <li>
              <Link to="/radio" className="nav-link">
                <span className="nav-icon">💽</span>
                <span className="nav-text">ГОБЛИН FM</span>
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="nav-link">
                <span className="nav-icon">🖼️</span>
                <span className="nav-text">FREE 300</span>
              </Link>
            </li>
            <li>
              <Link to="/merch" className="nav-link">
                <span className="nav-icon">💀</span>
                <span className="nav-text">SOSA DROP</span>
              </Link>
            </li>
            <li>
              <Link to="/code" className="nav-link">
                <span className="nav-icon">🕵️‍♂️</span>
                <span className="nav-text">РОБЕРТ</span>
              </Link>
            </li>
            <li>
              <Link to="/chat" className="nav-link">
                <span className="nav-icon">🎭</span>
                <span className="nav-text">300 ГОБЛИНОВ</span>
              </Link>
            </li>
            <li>
              <Link to="/news" className="nav-link">
                <span className="nav-icon">📡</span>
                <span className="nav-text">SOSA NEWS</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Киберпанк декоративная полоса */}
      <div className="cyber-bar">
        <div className="cyber-bar-text">
          ПЛАТИНА 300 ГОБЛИН ПЛАТИНА 300 ГОБЛИН ПЛАТИНА 300 ГОБЛИН
        </div>
      </div>
    </header>
  );
};

export default Header;