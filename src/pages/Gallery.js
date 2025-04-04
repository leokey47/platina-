import React, { useState } from 'react';
import './Gallery.css';

// Предположим, что эти данные будут приходить с API
const galleryItems = [
  {
    id: 1,
    title: "Крысиный король",
    artist: "R4TKING",
    imageUrl: "https://via.placeholder.com/500x500",
    likes: 127,
    description: "Цифровая иллюстрация короля крыс в неоновом стиле."
  },
  {
    id: 2,
    title: "Гоблин в городе",
    artist: "NEON300",
    imageUrl: "https://via.placeholder.com/500x500",
    likes: 95,
    description: "Платина в образе городского гоблина с отсылками к треку 'Гоблин Стайл'."
  },
  {
    id: 3,
    title: "Логово 300",
    artist: "CYBERPLTN",
    imageUrl: "https://via.placeholder.com/500x500",
    likes: 210,
    description: "Концепт-арт логова Платины в киберпанк стиле."
  },
  {
    id: 4,
    title: "Неоновый Гоблин",
    artist: "GLITCHMASTER",
    imageUrl: "https://via.placeholder.com/500x500",
    likes: 183,
    description: "Портрет в глитч-арт стиле с неоновыми элементами."
  },
  {
    id: 5,
    title: "Крысы атакуют",
    artist: "DIGITALGOBLIN",
    imageUrl: "https://via.placeholder.com/500x500",
    likes: 159,
    description: "Иллюстрация к треку 'Крысиная атака' - орда крыс заполоняет город."
  },
  {
    id: 6,
    title: "300 Символов",
    artist: "PLATINUMART",
    imageUrl: "https://via.placeholder.com/500x500",
    likes: 144,
    description: "Графическая работа с использованием числа 300 в различных стилях."
  }
];

const Gallery = () => {
  const [items, setItems] = useState(galleryItems);
  const [activeItem, setActiveItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showUpload, setShowUpload] = useState(false);
  
  // Лайк арта
  const likeItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };
  
  // Сортировка артов
  const sortedItems = () => {
    let filtered = [...items];
    
    // Фильтрация
    if (filter === 'rats') {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes('крыс') || 
        item.description.toLowerCase().includes('крыс')
      );
    } else if (filter === 'goblin') {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes('гоблин') || 
        item.description.toLowerCase().includes('гоблин')
      );
    } else if (filter === '300') {
      filtered = filtered.filter(item => 
        item.title.includes('300') || 
        item.description.includes('300')
      );
    }
    
    // Сортировка
    if (sortBy === 'likes') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    }
    
    return filtered;
  };
  
  // Открыть детали арта
  const openItemDetails = (item) => {
    setActiveItem(item);
  };
  
  // Закрыть детали арта
  const closeItemDetails = () => {
    setActiveItem(null);
  };
  
  // Компонент для отображения детальной информации об арте
  const ItemDetails = ({ item, onClose }) => {
    return (
      <div className="item-details-overlay">
        <div className="item-details">
          <button className="close-btn" onClick={onClose}>×</button>
          <div className="item-details-content">
            <div className="item-image-container">
              <img src={item.imageUrl} alt={item.title} className="item-image" />
            </div>
            <div className="item-info">
              <h2>{item.title}</h2>
              <p className="artist">Автор: <span>{item.artist}</span></p>
              <p className="likes">{item.likes} ❤</p>
              <p className="description">{item.description}</p>
              <button className="neon-button like-btn" onClick={() => likeItem(item.id)}>
                ОЦЕНИТЬ
              </button>
              <div className="share-options">
                <h3>ПОДЕЛИТЬСЯ</h3>
                <div className="social-share">
                  <button className="share-btn">VK</button>
                  <button className="share-btn">TG</button>
                  <button className="share-btn">IG</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Компонент формы загрузки нового арта
  const UploadForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      artist: '',
      description: '',
      image: null
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Здесь будет логика загрузки на сервер
      // Добавим временно в локальный массив
      const newItem = {
        id: items.length + 1,
        title: formData.title,
        artist: formData.artist,
        imageUrl: "https://via.placeholder.com/500x500", // Заглушка
        likes: 0,
        description: formData.description
      };
      
      setItems([newItem, ...items]);
      setShowUpload(false);
      setFormData({ title: '', artist: '', description: '', image: null });
    };
    
    return (
      <div className="upload-overlay">
        <div className="upload-form">
          <button className="close-btn" onClick={() => setShowUpload(false)}>×</button>
          <h2>ЗАГРУЗИТЬ АРТ</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Название работы</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ваш псевдоним</label>
              <input 
                type="text" 
                name="artist" 
                value={formData.artist}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group file-input">
              <label>Загрузить изображение</label>
              <input 
                type="file" 
                name="image" 
                accept="image/*"
                required
              />
            </div>
            <button type="submit" className="neon-button">ОПУБЛИКОВАТЬ</button>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1 className="gallery-title">
          <span className="glow-text">FREE</span> 300
        </h1>
        <p className="gallery-description">
          Арт-галерея от фанатов для фанатов. Лучшие работы будут использованы в мерче.
        </p>
      </div>
      
      <div className="gallery-controls">
        <div className="filter-controls">
          <label>ФИЛЬТР:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все работы</option>
            <option value="rats">Крысы</option>
            <option value="goblin">Гоблины</option>
            <option value="300">300</option>
          </select>
        </div>
        
        <div className="sort-controls">
          <label>СОРТИРОВКА:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Новые</option>
            <option value="likes">Популярные</option>
          </select>
        </div>
        
        <button 
          className="neon-button upload-btn"
          onClick={() => setShowUpload(true)}
        >
          ЗАГРУЗИТЬ
        </button>
      </div>
      
      <div className="gallery-grid">
        {sortedItems().map((item) => (
          <div key={item.id} className="gallery-item" onClick={() => openItemDetails(item)}>
            <div className="item-image-wrapper">
              <img src={item.imageUrl} alt={item.title} className="item-thumbnail" />
              <div className="item-overlay">
                <h3>{item.title}</h3>
                <p className="artist-name">{item.artist}</p>
                <p className="item-likes">{item.likes} ❤</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Если нет элементов после фильтрации */}
      {sortedItems().length === 0 && (
        <div className="no-items">
          <p>По вашему запросу ничего не найдено</p>
          <button 
            className="neon-button"
            onClick={() => setFilter('all')}
          >
            СБРОСИТЬ ФИЛЬТР
          </button>
        </div>
      )}
      
      {/* Модальное окно с деталями */}
      {activeItem && (
        <ItemDetails item={activeItem} onClose={closeItemDetails} />
      )}
      
      {/* Модальное окно загрузки */}
      {showUpload && <UploadForm />}
    </div>
  );
};

export default Gallery;