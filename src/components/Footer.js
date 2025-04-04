import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">PLTN.<span className="lair-text">LAIR</span></h3>
          <p className="footer-desc">Цифровое логово для истинных фанатов</p>
          <p className="copyright">© {currentYear} ПЛАТИНОВОЕ ЛОГОВО</p>
        </div>
        
        <div className="footer-section socials">
          <h3>НАЙДИ НАС</h3>
          <div className="social-links">
            <a href="#" className="social-link" title="VK">
              <i className="fab fa-vk"></i>
            </a>
            <a href="#" className="social-link" title="Telegram">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="social-link" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link" title="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>ХОЧЕШЬ СВЯЗАТЬСЯ?</h3>
          <button className="neon-button contact-btn">НАПИСАТЬ ГОБЛИНУ</button>
        </div>
      </div>
      
      <div className="easter-egg">
        <p className="hidden-text">SECRET CODE: 3-0-0-G-0-8-L-1-N</p>
      </div>
      
      {/* Случайные пробегающие крысы в футере */}
      <div className="footer-rats">
        <div className="rat rat1"></div>
        <div className="rat rat2"></div>
        <div className="rat rat3"></div>
      </div>
    </footer>
  );
};

export default Footer;