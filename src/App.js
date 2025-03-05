import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Импортируем роутер и компоненты
import MainPage from "./MainPage"; // Импортируем MainPage

function App() {
  return (
    <Router>
      <Routes>
        {/* Редирект на MainPage при загрузке */}
        <Route path="/" element={<Navigate to="/main" />} />
        
        {/* Основной роут для MainPage */}
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
