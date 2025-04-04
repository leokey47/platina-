import React, { useState, useEffect } from 'react';
import './Nest.css';

// Импорт изображений и аудио
import bgImage from '../assets/images/nest-bg.jpg';
import glitchOverlay from '../assets/images/glitch-overlay.png';
import ratClickSound from '../assets/sounds/rat-click.mp3';

const Nest = ({ onRatClick }) => {
  const [rats, setRats] = useState([]);
  const [activeGraffiti, setActiveGraffiti] = useState(null);
  const [enterCode, setEnterCode] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  
  // Создаем случайные крысы
  useEffect(() => {
    const generateRats = () => {
      const newRats = [];
      const ratCount = Math.floor(Math.random() * 5) + 3; // 3-7 крыс
      
      for(let i = 0; i < ratCount; i++) {
        newRats.push({
          id: i,
          left: Math.random() * 90 + 5, // 5-95%
          top: Math.random() * 70 + 15, // 15-85%
          speed: Math.random() * 5 + 5, // 5-10s скорость бега
          delay: Math.random() * 2, // 0-2s задержка
          size: Math.random() * 0.5 + 0.7 // 0.7-1.2 размер
        });
      }
      
      setRats(newRats);
    };
    
    generateRats();
    
    // Обновляем крыс каждые 30 секунд
    const interval = setInterval(generateRats, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // Обработчик клика по крысе
  const handleRatClick = (id) => {
    // Воспроизведение звука
    const audio = new Audio(ratClickSound);
    audio.volume = 0.3; // Тише звук
    audio.play();
    
    // Вызываем функцию из App.js для отслеживания кликов
    if (onRatClick) {
      onRatClick();
    }
    
    // Удаляем крысу, на которую кликнули
    setRats(rats.filter(rat => rat.id !== id));
  };
  
  // Обработчик граффити
  const handleGraffitiClick = (id) => {
    setActiveGraffiti(id === activeGraffiti ? null : id);
  };
  
  // Проверка секретного кода
  const checkSecretCode = (e) => {
    e.preventDefault();
    if (enterCode.toLowerCase() === '300goblins' || enterCode.toLowerCase() === '300гоблинов') {
      setCodeMessage('ДОСТУП РАЗРЕШЕН. ИНИЦИАЛИЗАЦИЯ...');
      setTimeout(() => {
        window.location.href = '/secret';
      }, 2000);
    } else {
      setCodeMessage('НЕВЕРНЫЙ КОД. ПОПРОБУЙТЕ ЕЩЕ РАЗ.');
      setTimeout(() => {
        setCodeMessage('');
      }, 3000);
    }
    setEnterCode('');
  };
  
  return (
    <div className="nest-container">
      {/* Основное изображение киберпанк-логова */}
      <div className="nest-background" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="glitch-overlay" style={{ backgroundImage: `url(${glitchOverlay})` }}></div>
        
        {/* Бегущие крысы */}
        {rats.map((rat) => (
          <div 
            key={rat.id}
            className="rat"
            style={{
              left: `${rat.left}%`,
              top: `${rat.top}%`,
              animation: `rat-move ${rat.speed}s linear infinite`,
              animationDelay: `${rat.delay}s`,
              transform: `scale(${rat.size})`
            }}
            onClick={() => handleRatClick(rat.id)}
          ></div>
        ))}
        
        {/* Граффити на стенах */}
        <div 
          className="graffiti graffiti-1" 
          onClick={() => handleGraffitiClick(1)}
        >
          GOBLINS
        </div>
        
        <div 
          className="graffiti graffiti-2" 
          onClick={() => handleGraffitiClick(2)}
        >
          300
        </div>
        
        <div 
          className="graffiti graffiti-3" 
          onClick={() => handleGraffitiClick(3)}
        >
          PLTN
        </div>
        
        {/* Информационная панель для активного граффити */}
        {activeGraffiti && (
          <div className="graffiti-info">
            <div className="graffiti-info-content">
              <h3>{activeGraffiti === 1 ? 'ГОБЛИНСКАЯ ИМПЕРИЯ' : 
                  activeGraffiti === 2 ? '300 КЛАНОВ' : 
                  'ПЛАТИНА РЕЗИДЕНЦИЯ'}</h3>
              <p>
                {activeGraffiti === 1 ? 'Секретное сообщество адептов гоблинской культуры. Присоединяйся к движению, стань частью гоблинского братства. Кто не с нами, тот против нас.' : 
                activeGraffiti === 2 ? 'Легендарная цифра, объединяющая всех истинных фанатов. 300 - это код, 300 - это путь, 300 - это жизнь.' : 
                'Здесь рождаются настоящие хиты. Только избранные знают путь в лабиринты платиновой резиденции.'}
              </p>
              <button 
                className="neon-button" 
                onClick={() => setActiveGraffiti(null)}
              >
                ЗАКРЫТЬ
              </button>
            </div>
          </div>
        )}
        
        {/* Ввод секретного кода */}
        <div className="secret-code-panel">
          <div className="code-panel-content">
            <h3 className="glitch-text" data-text="ВВЕДИТЕ КОД ДОСТУПА">ВВЕДИТЕ КОД ДОСТУПА</h3>
            <form onSubmit={checkSecretCode}>
              <input 
                type="text" 
                value={enterCode}
                onChange={(e) => setEnterCode(e.target.value)}
                className="code-input"
                placeholder="..."
              />
              <button type="submit" className="neon-button">ВОЙТИ</button>
            </form>
            {codeMessage && <p className="code-message">{codeMessage}</p>}
          </div>
        </div>
        
        {/* Информация о нахождении секретов */}
        <div className="info-panel">
          <h2>КРЫСИНОЕ ЛОГОВО</h2>
          <p>Добро пожаловать в цифровое логово истинных фанатов. Здесь вы найдете тайны, секреты и эксклюзивный контент.</p>
          <p className="hint">Подсказка: Ищи крыс, они знают секретные пути.</p>
        </div>
      </div>
    </div>
  );
};

export default Nest;