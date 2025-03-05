// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Создадим стили для Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/page2">Страница 2</Link>
        </li>
        <li>
          <Link to="/page3">Страница 3</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
