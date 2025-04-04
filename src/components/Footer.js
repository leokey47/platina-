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
              VK
            </a>
            <a href="#" className="social-link" title="Telegram">
              TG
            </a>
            <a href="#" className="social-link" title="Instagram">
              IG
            </a>
            <a href="#" className="social-link" title="YouTube">
              YT
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
      
      {/* Эмуляция крыс в футере с помощью текста вместо изображений */}
      <div className="footer-rats">
        <div className="rat-text rat1">🐀</div>
        <div className="rat-text rat2">🐀</div>
        <div className="rat-text rat3">🐀</div>
      </div>
    </footer>
  );
};

export default Footer;