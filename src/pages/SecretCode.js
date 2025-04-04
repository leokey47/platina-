import React, { useState, useEffect } from 'react';
import './SecretCode.css';

// Импорт фонового изображения
// import secretBg from 'https://example.com/placeholder-image.jpg';

// Данные для мини-игры
const secretSymbols = [
  { id: 1, name: "крыса", found: false, clue: "Бегает по странице с мерчем, если кликнуть на товар" },
  { id: 2, name: "гоблин", found: false, clue: "Ищи его в верхнем колонтитуле каждой страницы" },
  { id: 3, name: "300", found: false, clue: "Скрыто в футере как 'секретный код'" },
  { id: 4, name: "платина", found: false, clue: "Повторяется в бегущей строке в шапке" },
  { id: 5, name: "роберт", found: false, clue: "Слово, которое ты сейчас ищешь" }
];

// Секретный контент, который откроется, когда все символы найдены
const secretContent = {
  title: "ПЛАТИНОВЫЙ АРХИВ",
  description: "Поздравляю! Ты получил доступ к секретному архиву Платины.",
  items: [
    { 
      id: 1, 
      title: "Неизданный трек 'КРЫСИНЫЙ КОРОЛЬ'", 
      type: "audio",
      url: "https://example.com/secret-track.mp3" 
    },
    { 
      id: 2, 
      title: "Эксклюзивные фото со студии", 
      type: "image",
      url: "https://via.placeholder.com/500x300" 
    },
    { 
      id: 3, 
      title: "Сниппет нового альбома", 
      type: "audio",
      url: "https://example.com/secret-snippet.mp3" 
    },
    { 
      id: 4, 
      title: "Секретный код на скидку: GOBLIN300", 
      type: "code",
      code: "GOBLIN300" 
    }
  ]
};

const SecretCode = ({ secretMode }) => {
  const [symbols, setSymbols] = useState(secretSymbols);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintTimer, setHintTimer] = useState(60);
  const [inputCode, setInputCode] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [allFound, setAllFound] = useState(false);
  
  // Эффект для проверки, все ли символы найдены
  useEffect(() => {
    const foundAll = symbols.every(symbol => symbol.found);
    setAllFound(foundAll);
  }, [symbols]);
  
  // Эффект для таймера подсказки
  useEffect(() => {
    if (!showHint || hintTimer <= 0) return;
    
    const timer = setInterval(() => {
      setHintTimer(prev => prev - 1);
      
      if (hintTimer <= 1) {
        setShowHint(false);
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showHint, hintTimer]);
  
  // Обработчик выбора символа
  const handleSymbolSelect = (id) => {
    const symbol = symbols.find(s => s.id === id);
    setSelectedSymbol(symbol);
  };
  
  // Обработчик для показа подсказки
  const handleShowHint = () => {
    setShowHint(true);
    setHintTimer(60); // 60 секунд на подсказку
  };
  
  // Обработчик для ввода кода
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    
    // Проверяем код
    const symbolToCheck = symbols.find(s => s.name.toLowerCase() === inputCode.toLowerCase());
    
    if (symbolToCheck && !symbolToCheck.found) {
      // Правильный код
      setSymbols(symbols.map(s => 
        s.id === symbolToCheck.id ? { ...s, found: true } : s
      ));
      setCodeMessage(`Символ "${symbolToCheck.name.toUpperCase()}" найден!`);
      setInputCode("");
      
      setTimeout(() => {
        setCodeMessage("");
      }, 3000);
    } else if (symbolToCheck && symbolToCheck.found) {
      // Символ уже найден
      setCodeMessage(`Символ "${symbolToCheck.name.toUpperCase()}" уже был найден.`);
      setInputCode("");
      
      setTimeout(() => {
        setCodeMessage("");
      }, 3000);
    } else {
      // Неверный код
      setCodeMessage("Неверный код. Попробуй еще раз.");
      
      setTimeout(() => {
        setCodeMessage("");
      }, 3000);
    }
  };
  
  // Обработчик для копирования кода скидки
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCodeMessage("Код скопирован в буфер обмена!");
    
    setTimeout(() => {
      setCodeMessage("");
    }, 3000);
  };
  
  // Компонент для отображения символа
  const SymbolItem = ({ symbol, onSelect }) => {
    return (
      <div 
        className={`symbol-item ${symbol.found ? 'found' : ''}`}
        onClick={() => onSelect(symbol.id)}
      >
        <div className="symbol-icon">
          {symbol.found ? '✓' : '?'}
        </div>
        <div className="symbol-name">
          {symbol.found ? symbol.name.toUpperCase() : "????????????"}
        </div>
      </div>
    );
  };
  
  // Компонент для отображения деталей символа
  const SymbolDetails = ({ symbol, onShowHint }) => {
    return (
      <div className="symbol-details">
        <h3>{symbol.found ? symbol.name.toUpperCase() : "???????????"}</h3>
        
        <div className="symbol-status">
          <span className="status-label">Статус:</span>
          <span className={`status-value ${symbol.found ? 'found' : ''}`}>
            {symbol.found ? "НАЙДЕН" : "НЕ НАЙДЕН"}
          </span>
        </div>
        
        {!symbol.found && (
          <button 
            className="neon-button hint-btn"
            onClick={onShowHint}
            disabled={showHint}
          >
            {showHint ? `ПОДСКАЗКА (${hintTimer}с)` : "ПОЛУЧИТЬ ПОДСКАЗКУ"}
          </button>
        )}
        
        {showHint && !symbol.found && (
          <div className="hint-box">
            <p>{symbol.clue}</p>
          </div>
        )}
        
        {symbol.found && (
          <div className="success-box">
            <p>Символ найден! Продолжай поиски, чтобы открыть секретный контент.</p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="secret-code-container" style={{ backgroundImage: `url()` }}>
      <div className="secret-overlay">
        {secretMode && (
          <div className="secret-mode-banner">
            <span>СЕКРЕТНЫЙ РЕЖИМ АКТИВИРОВАН</span>
          </div>
        )}
        
        <div className="code-header">
          <h1 className="code-title">
            <span className="name-part">РОБЕРТ</span> - <span className="code-part">ТАЙНЫЙ КОД</span>
          </h1>
          <p className="code-description">
            Найди все 5 секретных символов на сайте, чтобы получить доступ к эксклюзивному контенту.
          </p>
        </div>
        
        <div className="code-container">
          <div className="symbols-list">
            <h2>СИМВОЛЫ ДЛЯ ПОИСКА</h2>
            <div className="symbols-grid">
              {symbols.map(symbol => (
                <SymbolItem 
                  key={symbol.id} 
                  symbol={symbol} 
                  onSelect={handleSymbolSelect}
                />
              ))}
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${(symbols.filter(s => s.found).length / symbols.length) * 100}%` }}
              ></div>
              <span className="progress-text">
                {symbols.filter(s => s.found).length} / {symbols.length}
              </span>
            </div>
          </div>
          
          <div className="code-interaction">
            {selectedSymbol ? (
              <SymbolDetails 
                symbol={selectedSymbol} 
                onShowHint={handleShowHint}
              />
            ) : (
              <div className="select-symbol-message">
                <p>Выбери символ для получения подробностей.</p>
              </div>
            )}
            
            <div className="code-entry">
              <h3>ВВЕСТИ КОД</h3>
              <p>Введи название найденного символа:</p>
              
              <form onSubmit={handleCodeSubmit}>
                <input 
                  type="text" 
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="code-input"
                  placeholder="Введи код..."
                />
                <button type="submit" className="neon-button">ПРОВЕРИТЬ</button>
              </form>
              
              {codeMessage && <p className="code-message">{codeMessage}</p>}
            </div>
          </div>
        </div>
        
        {/* Секретный контент, если все символы найдены */}
        {allFound && (
          <div className="secret-content">
            <h2>{secretContent.title}</h2>
            <p className="content-description">{secretContent.description}</p>
            
            <div className="content-items">
              {secretContent.items.map(item => (
                <div key={item.id} className="content-item">
                  <h3>{item.title}</h3>
                  
                  {item.type === 'image' && (
                    <img src={item.url} alt={item.title} className="content-image" />
                  )}
                  
                  {item.type === 'audio' && (
                    <div className="audio-player">
                      <audio controls>
                        <source src={item.url} type="audio/mp3" />
                        Твой браузер не поддерживает аудио.
                      </audio>
                    </div>
                  )}
                  
                  {item.type === 'code' && (
                    <div className="discount-code">
                      <span className="code-display">{item.code}</span>
                      <button 
                        className="copy-btn"
                        onClick={() => handleCopyCode(item.code)}
                      >
                        КОПИРОВАТЬ
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretCode;