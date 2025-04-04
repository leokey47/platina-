import React, { useState, useEffect, useRef } from 'react';
import './Radio.css';

// Импорт изображений
import radioImg from '../assets/images/radio-bg.jpg';
import cassetteImg from '../assets/images/cassette.png';

// Фейковые треки (в реальном приложении здесь будут API-данные)
const tracks = [
  { id: 1, title: "300 КРЫС", artist: "ПЛАТИНА", duration: "2:45", url: "https://example.com/track1.mp3" },
  { id: 2, title: "ГОБЛИН СТАЙЛ", artist: "ПЛАТИНА", duration: "3:12", url: "https://example.com/track2.mp3" },
  { id: 3, title: "ТЁМНОЕ ЛОГОВО", artist: "ПЛАТИНА ft. UNKNOWN", duration: "4:03", url: "https://example.com/track3.mp3" },
  { id: 4, title: "КИБЕРПАНК 2077", artist: "ПЛАТИНА", duration: "3:35", url: "https://example.com/track4.mp3" },
  { id: 5, title: "КРЫСИНАЯ АТАКА", artist: "ПЛАТИНА ft. RAT KING", duration: "3:21", url: "https://example.com/track5.mp3" },
  { id: 6, title: "НЕОНОВЫЙ ДАБ", artist: "ПЛАТИНА", duration: "2:58", url: "https://example.com/track6.mp3" },
  { id: 7, title: "ПЛАТИНОВЫЙ ГОБЛИН", artist: "ПЛАТИНА", duration: "3:47", url: "https://example.com/track7.mp3" }
];

// Фейковые голосовые сниппеты
const snippets = [
  "Это Гоблин онлайн!",
  "300 на связи!",
  "PLTN в эфире!",
  "Крысиное логово активировано!",
  "Всем гоблинам привет!",
  "Платиновый звук для настоящих!",
  "Чётко! Ровно! Платина!"
];

const Radio = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showSnippet, setShowSnippet] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState('');
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Инициализация с рандомным треком
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrack(tracks[randomIndex]);
  }, []);
  
  // Обновление прогресс-бара
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const calculatedCurrentTime = (currentTime + 0.1) % (parseFloat(currentTrack?.duration) || 3);
        setCurrentTime(calculatedTime => (calculatedTime + 0.1) % (parseFloat(currentTrack?.duration) || 3));
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);
  
  // Рандомные глитчи и сниппеты
  useEffect(() => {
    if (isPlaying) {
      // Рандомные глитчи
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.9) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 200);
        }
      }, 5000);
      
      // Рандомные голосовые сниппеты
      const snippetInterval = setInterval(() => {
        if (Math.random() > 0.85) {
          const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
          setCurrentSnippet(randomSnippet);
          setShowSnippet(true);
          
          setTimeout(() => {
            setShowSnippet(false);
          }, 3000);
        }
      }, 15000);
      
      return () => {
        clearInterval(glitchInterval);
        clearInterval(snippetInterval);
      };
    }
  }, [isPlaying]);
  
  // Обработчик для play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Обработчик для изменения трека
  const changeTrack = (track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };
  
  // Обработчик для изменения громкости
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  
  // Конвертация времени в формат мм:сс
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Функция для следующего трека
  const nextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    changeTrack(tracks[nextIndex]);
  };
  
  // Функция для предыдущего трека
  const prevTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    changeTrack(tracks[prevIndex]);
  };
  
  return (
    <div className="radio-container">
      <div className="radio-background" style={{ backgroundImage: `url(${radioImg})` }}>
        <div className={`radio-player ${isGlitching ? 'glitching' : ''}`}>
          <div className="player-header">
            <h2>ГОБЛИН FM</h2>
            <span className="frequency">RADIO 300</span>
          </div>
          
          <div className="cassette-container">
            <img 
              src={cassetteImg} 
              alt="Кассета" 
              className={`cassette ${isPlaying ? 'rotating' : ''}`} 
            />
            
            {showSnippet && (
              <div className="voice-snippet">
                <p>{currentSnippet}</p>
              </div>
            )}
          </div>
          
          <div className="track-info">
            <div className="track-name">{currentTrack?.title || "Выберите трек"}</div>
            <div className="track-artist">{currentTrack?.artist || ""}</div>
          </div>
          
          <div className="progress-container">
            <div className="time-display">{formatTime(currentTime)}</div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                ref={progressBarRef}
                style={{ width: `${(currentTime / (parseFloat(currentTrack?.duration) || 1)) * 100}%` }}
              ></div>
            </div>
            <div className="time-display">{currentTrack?.duration || "0:00"}</div>
          </div>
          
          <div className="controls">
            <button className="control-button prev" onClick={prevTrack}>
              <i className="fas fa-step-backward"></i>
            </button>
            <button className="control-button play-pause" onClick={togglePlay}>
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button className="control-button next" onClick={nextTrack}>
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
          
          <div className="volume-container">
            <i className="fas fa-volume-down"></i>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={handleVolumeChange} 
              className="volume-slider" 
            />
            <i className="fas fa-volume-up"></i>
          </div>
          
          <button 
            className="playlist-toggle neon-button" 
            onClick={() => setShowPlaylist(!showPlaylist)}
          >
            {showPlaylist ? "СКРЫТЬ ПЛЕЙЛИСТ" : "ПОКАЗАТЬ ПЛЕЙЛИСТ"}
          </button>
        </div>
        
        {showPlaylist && (
          <div className="playlist">
            <h3>ПЛЕЙЛИСТ ГОБЛИНА</h3>
            <ul>
              {tracks.map(track => (
                <li 
                  key={track.id} 
                  className={currentTrack?.id === track.id ? 'active' : ''}
                  onClick={() => changeTrack(track)}
                >
                  <span className="track-title">{track.title}</span>
                  <span className="track-artist-playlist">{track.artist}</span>
                  <span className="track-duration">{track.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Radio;