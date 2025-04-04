import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

// Фоновое изображение
import chatBg from '../assets/images/chat-bg.jpg';

// Генерация фейковых сообщений чата
const initialMessages = [
  {
    id: 1,
    username: "PLATINA_OFFICIAL",
    message: "ДОБРО ПОЖАЛОВАТЬ В ЧАТ ГОБЛИНОВ! ЗДЕСЬ ТОЛЬКО РЕАЛЬНЫЕ ФАНЫ.",
    timestamp: new Date(Date.now() - 3600000 * 2),
    isAdmin: true
  },
  {
    id: 2,
    username: "KRISA_99",
    message: "кто идет на концерт в москве?",
    timestamp: new Date(Date.now() - 3600000),
    isAdmin: false
  },
  {
    id: 3,
    username: "GOBLIN_STYLE",
    message: "буду там! встретимся у сцены",
    timestamp: new Date(Date.now() - 1800000),
    isAdmin: false
  },
  {
    id: 4,
    username: "RAT_KING",
    message: "новый альбом просто огонь! крысиная атака лучший трек!",
    timestamp: new Date(Date.now() - 900000),
    isAdmin: false
  },
  {
    id: 5,
    username: "NEON_PLTN",
    message: "кто-нибудь нашел все секретные символы на сайте? роберт сложный...",
    timestamp: new Date(Date.now() - 300000),
    isAdmin: false
  }
];

// Сообщения от "Гоблина" для ночного режима
const goblinMessages = [
  "ВСЕ ГОБЛИНЫ СОБРАЛИСЬ? НАЧИНАЕМ ТЁМНОЕ СБОРИЩЕ...",
  "КРЫСЫ НАБЛЮДАЮТ ЗА ВАМИ. БУДЬТЕ ОСТОРОЖНЫ С ТЕМ, ЧТО ПИШЕТЕ.",
  "ТОТ, КТО НАЙДЁТ ВСЕ СИМВОЛЫ, ПОЛУЧИТ ДОСТУП К ТАЙНОМУ ЛОГОВУ.",
  "300 - ЭТО НЕ ПРОСТО ЧИСЛО. ЭТО КОД К ДРУГОМУ ИЗМЕРЕНИЮ.",
  "НОВЫЙ ДРОП СКОРО. ТОЛЬКО ДЛЯ ИЗБРАННЫХ. СЛЕДИТЕ ЗА КРЫСАМИ.",
  "ПЛАТИНОВОЕ ЦАРСТВО ПРИВЕТСТВУЕТ ИСТИННЫХ ГОБЛИНОВ."
];

// Функция для преобразования обычного текста в "гоблинский стиль"
const convertToGoblinStyle = (text) => {
  // Заменяем некоторые буквы и добавляем случайные заглавные буквы
  return text
    .split('')
    .map(char => Math.random() > 0.3 ? char : char.toUpperCase())
    .join('')
    .replace(/а/g, 'a')
    .replace(/е/g, 'e')
    .replace(/о/g, '0')
    .replace(/и/g, 'u')
    .replace(/т/g, 't')
    .replace(/р/g, 'p')
    .replace(/с/g, 'c')
    .replace(/з/g, '3')
    .replace(/б/g, '6')
    .replace(/ч/g, '4');
};

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(78); // Фейковое число онлайн-пользователей
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const chatContainerRef = useRef(null);
  
  // Проверка времени для ночного режима
  useEffect(() => {
    const checkNightMode = () => {
      const currentHour = new Date().getHours();
      return currentHour >= 22 || currentHour < 6;
    };
    
    setIsNightMode(checkNightMode());
    
    const interval = setInterval(() => {
      setIsNightMode(checkNightMode());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Эффект для случайных сообщений от "Гоблина" в ночном режиме
  useEffect(() => {
    if (!isNightMode) return;
    
    const goblinInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomMessage = goblinMessages[Math.floor(Math.random() * goblinMessages.length)];
        
        const newMessage = {
          id: Date.now(),
          username: "GOBLIN_MASTER",
          message: randomMessage,
          timestamp: new Date(),
          isAdmin: true,
          isGoblin: true
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Прокрутка чата вниз
        if (chatContainerRef.current) {
          setTimeout(() => {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }, 100);
        }
      }
    }, 30000);
    
    return () => clearInterval(goblinInterval);
  }, [isNightMode]);
  
  // Эффект для прокрутки чата вниз при добавлении новых сообщений
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Эффект для имитации живого чата с фейковыми сообщениями
  useEffect(() => {
    const usernames = ["KRISA_999", "GOBLIN_FAN", "PLTN_LOVER", "RAT_SQUAD", "NEON_HACKER", "CYBER_GOBLIN"];
    const messageTemplates = [
      "кто слушает новый трек?",
      "где можно достать билеты на концерт?",
      "крысиный стиль - лучший!",
      "300 навсегда в сердце",
      "платина рулит!",
      "гоблины, вы где?",
      "кто нашел все пасхалки на сайте?",
      "как думаете, когда выйдет новый альбом?",
      "мерч огонь! купил худи",
      "кто из москвы тут?"
    ];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
        const randomMessage = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
        
        const newMessage = {
          id: Date.now(),
          username: randomUsername,
          message: convertToGoblinStyle(randomMessage),
          timestamp: new Date(),
          isAdmin: false
        };
        
        setMessages(prev => [...prev, newMessage]);
        setOnlineUsers(prev => Math.floor(Math.random() * 10) - 5 + prev);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Обработчик отправки сообщения
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      username,
      message: convertToGoblinStyle(inputMessage),
      timestamp: new Date(),
      isAdmin: false,
      isUser: true
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };
  
  // Обработчик входа в чат
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setIsLoggedIn(true);
    
    // Добавляем приветственное сообщение
    const welcomeMessage = {
      id: Date.now(),
      username: "PLATINA_OFFICIAL",
      message: `ДОБРО ПОЖАЛОВАТЬ, ${username}! ТЕПЕРЬ ТЫ ЧАСТЬ ГОБЛИНСКОГО СООБЩЕСТВА.`,
      timestamp: new Date(),
      isAdmin: true
    };
    
    setMessages([...messages, welcomeMessage]);
  };
  
  // Форматирование времени
  const formatTime = (timestamp) => {
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Компонент сообщения
  const ChatMessage = ({ message }) => {
    return (
      <div className={`message ${message.isAdmin ? 'admin-message' : ''} ${message.isGoblin ? 'goblin-message' : ''} ${message.isUser ? 'user-message' : ''}`}>
        <div className="message-header">
          <span className="username">{message.username}</span>
          <span className="timestamp">{formatTime(message.timestamp)}</span>
        </div>
        <div className="message-content">{message.message}</div>
      </div>
    );
  };
  
  // Форма входа в чат
  const LoginForm = () => {
    return (
      <div className="login-container">
        <h2>ВХОД В ЧАТ ГОБЛИНОВ</h2>
        <p>Введи свой никнейм, чтобы присоединиться к чату</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Никнейм..."
            maxLength={15}
            required
          />
          <button type="submit" className="neon-button">ВОЙТИ</button>
        </form>
        
        {isNightMode && (
          <div className="night-warning">
            <p>ВНИМАНИЕ! СЕЙЧАС АКТИВЕН НОЧНОЙ РЕЖИМ "ТЁМНОЕ СБОРИЩЕ"</p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`chat-container ${isNightMode ? 'night-mode' : ''}`} style={{ backgroundImage: `url(${chatBg})` }}>
      <div className="chat-overlay">
        {!isLoggedIn ? (
          <LoginForm />
        ) : (
          <div className="chat-interface">
            <div className="chat-header">
              <h2>
                {isNightMode ? 'ТЁМНОЕ СБОРИЩЕ' : '300 ГОБЛИНОВ'}
              </h2>
              <div className="chat-stats">
                <span>Онлайн: {onlineUsers}</span>
                {isNightMode && <span className="night-indicator">НОЧНОЙ РЕЖИМ</span>}
              </div>
            </div>
            
            <div className="chat-messages" ref={chatContainerRef}>
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            <form className="chat-input-form" onSubmit={handleSubmit}>
              <div className="emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                😈
              </div>
              
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <div className="emoji-grid">
                    {['😈', '👹', '👺', '💀', '👻', '🐀', '🔥', '💯', '🎭', '🤘'].map(emoji => (
                      <div 
                        key={emoji} 
                        className="emoji"
                        onClick={() => {
                          setInputMessage(inputMessage + emoji);
                          setShowEmojiPicker(false);
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Напиши сообщение..."
                maxLength={200}
              />
              <button type="submit" className="send-btn">ОТПРАВИТЬ</button>
            </form>
            
            <div className="chat-footer">
              <p>Все сообщения будут преобразованы в гоблинский стиль</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;