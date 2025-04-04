import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Импортируем компоненты страниц
import Header from './components/Header';
import Footer from './components/Footer';
import Nest from './Pages/Nest';
import Radio from './Pages/Radio';
import Gallery from './Pages/Gallery';
import Merch from './Pages/Merch';
import SecretCode from './Pages/SecretCode';
import Chat from './Pages/Chat';
import News from './Pages/News';

// Заглушка для звука - функция, которая ничего не делает
const playDummySound = () => {
  console.log("Звук воспроизведен (заглушка)");
};

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
      // Проигрываем звуковой эффект (заглушка)
      playDummySound();
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

  // Компонент для секретной области
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

  return (
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
  );
}

export default App;