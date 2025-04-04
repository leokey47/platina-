import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <div className="logo-placeholder"></div>
          <h1 className="site-title">PLTN.<span className="lair-text">LAIR</span></h1>
        </Link>
        
        <div 
          className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
      
      <div className="cyber-bar">
        <div className="cyber-bar-text">
          ПЛАТИНА 300 ГОБЛИН ПЛАТИНА 300 ГОБЛИН ПЛАТИНА 300 ГОБЛИН
        </div>
      </div>
    </header>
  );
};

export default Header;