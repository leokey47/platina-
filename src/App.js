import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Импортируем компоненты страниц
import Header from './components/Header';
import Footer from './components/Footer';
import Nest from './pages/Nest';
import Radio from './pages/Radio';
import Gallery from './pages/Gallery';
import Merch from './pages/Merch';
import SecretCode from './pages/SecretCode';
import Chat from './pages/Chat';
import News from './pages/News';

// Аудио для фонового эффекта
import ratsSound from './assets/sounds/rats.mp3';

function App() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [secretMode, setSecretMode] = useState(false);
  const [ratClicks, setRatClicks] = useState(0);
  
  // Функция для отслеживания кликов по крысам
  const handleRatClick = () => {
    setRatClicks(prev => prev + 1);
    
    // Если кликнули 3 раза по крысам - активируем секретный режим
    if (ratClicks === 2) {
      setSecretMode(true);
      // Проигрываем звуковой эффект
      const audio = new Audio(ratsSound);
      audio.play();
    }
  };

  // Эффект для проверки ночного времени для чата
  useEffect(() => {
    const checkNightMode = () => {
      const currentHour = new Date().getHours();
      return currentHour >= 22 || currentHour < 6;
    };
    
    const interval = setInterval(() => {
      const isNight = checkNightMode();
      document.body.classList.toggle('night-mode', isNight);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className={`app ${secretMode ? 'secret-mode' : ''}`}>
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Nest onRatClick={handleRatClick} />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/code" element={<SecretCode secretMode={secretMode} />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/news" element={<News />} />
            {secretMode && <Route path="/secret" element={<SecretArea />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Секретная страница, доступная только после кликов по крысам
const SecretArea = () => {
  return (
    <div className="secret-area">
      <h2 className="glitch-text">300 ДОСТУП ОТКРЫТ</h2>
      <div className="secret-content">
        <p>Приветствую в тайном логове. Здесь только избранные.</p>
        <div className="bonus-content">
          <h3>Бонусный контент</h3>
          <ul>
            <li>Неизданный трек "Крысиное логово"</li>
            <li>Эксклюзивные фото с секретной студии</li>
            <li>Секретный код для получения скидки на мерч: GOBLIN300</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;