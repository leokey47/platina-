import React, { useState, useEffect } from 'react';
import './News.css';

// Импорт фонового изображения
// import newsBg from 'https://example.com/placeholder-image.jpg';

// Генерация фейковых новостей
const initialPosts = [
  {
    id: 1,
    author: "GOBLIN_MASTER",
    title: "АНОНИМНАЯ СЕТЬ ГОБЛИНОВ РАСШИРЯЕТСЯ",
    content: "Братья и сёстры! Наш крысиный союз становится сильнее с каждым днём. Теперь нас больше 300 в каждом городе. Скоро начнётся глобальная экспансия платинового стиля. Готовьтесь к следующей фазе — операция 'GOBLIN STYLE' запускается через 30 дней.",
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 дня назад
    likes: 187,
    comments: 43,
    image: "https://via.placeholder.com/600x300",
    tags: ["анонс", "движение", "goblin"]
  },
  {
    id: 2,
    author: "NEON_KRISA",
    title: "РЕПОРТАЖ С ПОДПОЛЬНОГО КОНЦЕРТА",
    content: "Вчера состоялся тайный концерт в заброшенном бункере. Только избранные получили координаты. Было около 100 гоблинов, атмосфера зашкаливала. Платина зачитал неизданный трек 'Крысиное царство'. Я записал на диктофон, но звук получился очень плохой из-за сильных басов и аккустики бункера. Следите за новостями — скоро будут новые тайные сходки.",
    timestamp: new Date(Date.now() - 86400000), // 1 день назад
    likes: 129,
    comments: 28,
    audio: "https://example.com/audio.mp3",
    tags: ["концерт", "андеграунд", "эксклюзив"]
  },
  {
    id: 3,
    author: "RAT_KING",
    title: "РАСШИФРОВКА КОДА '300'",
    content: "После многих месяцев исследований я раскрыл часть тайны числа 300. Это не просто число — это код, отсылающий к древней платиновой цивилизации гоблинов, которая существовала задолго до нашей эры. Их знания были записаны на крысиных свитках, которые сейчас хранятся в секретном месте. Платина — последний хранитель этих знаний. Слушайте внимательно его треки — там зашифрованы координаты древнего логова.",
    timestamp: new Date(Date.now() - 43200000), // 12 часов назад
    likes: 301,
    comments: 75,
    tags: ["теория", "300", "тайны"]
  },
  {
    id: 4,
    author: "CYBER_GOBLIN",
    title: "СЛИЛИ ДАТУ ВЫХОДА НОВОГО АЛЬБОМА",
    content: "Мой знакомый работает в студии и случайно увидел график релизов. Новый альбом 'ПЛАТИНОВАЯ ИМПЕРИЯ КРЫС' должен выйти через 3 месяца. В нём будет 13 треков, включая совместки с [ДАННЫЕ УДАЛЕНЫ]. Храните эту информацию в тайне, не распространяйте слишком широко.",
    timestamp: new Date(Date.now() - 7200000), // 2 часа назад
    likes: 215,
    comments: 52,
    tags: ["слив", "инсайд", "альбом"]
  },
  {
    id: 5,
    author: "PLTN_PROPHET",
    title: "СЕКРЕТНЫЙ ДРОП МЕРЧА СКОРО",
    content: "Получил информацию из надёжного источника: готовится лимитированная коллекция 'КРЫСИНОЕ ЛОГОВО'. Всего 300 штук, каждая с уникальным номером. Продажи будут только через секретную ссылку, которую будут передавать из рук в руки. Мерч будет светиться в темноте и содержать скрытые символы, видимые только под ультрафиолетом.",
    timestamp: new Date(Date.now() - 3600000), // 1 час назад
    likes: 163,
    comments: 37,
    image: "https://via.placeholder.com/600x300",
    tags: ["мерч", "дроп", "эксклюзив"]
  }
];

const News = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTag, setActiveTag] = useState('все');
  const [sortBy, setSortBy] = useState('newest');
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: '',
    image: null,
    audio: null
  });
  
  // Все уникальные теги из постов
  const allTags = ['все', ...new Set(posts.flatMap(post => post.tags))];
  
  // Обработчик сортировки
  const sortedPosts = () => {
    let filtered = [...posts];
    
    // Фильтрация по тегу
    if (activeTag !== 'все') {
      filtered = filtered.filter(post => post.tags.includes(activeTag));
    }
    
    // Сортировка
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'discussed') {
      filtered.sort((a, b) => b.comments - a.comments);
    }
    
    return filtered;
  };
  
  // Обработчик лайка поста
  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };
  
  // Обработчик изменения данных новой публикации
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
  
  // Обработчик отправки новой публикации
  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    const newId = Math.max(...posts.map(post => post.id)) + 1;
    const tagsArray = newPost.tags.split(',').map(tag => tag.trim().toLowerCase());
    
    const publishedPost = {
      id: newId,
      author: "ANONYM_USER",
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      tags: tagsArray,
      // В реальном приложении здесь была бы загрузка файлов
      image: newPost.image ? URL.createObjectURL(newPost.image) : null,
      audio: newPost.audio ? URL.createObjectURL(newPost.audio) : null
    };
    
    setPosts([publishedPost, ...posts]);
    setNewPost({ title: '', content: '', tags: '', image: null, audio: null });
    setShowPostForm(false);
  };
  
  // Обработчик загрузки файлов
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setNewPost({ ...newPost, [name]: files[0] });
    }
  };
  
  // Форматирование даты
  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // менее минуты
      return 'только что';
    } else if (diff < 3600000) { // менее часа
      return `${Math.floor(diff / 60000)} мин назад`;
    } else if (diff < 86400000) { // менее суток
      return `${Math.floor(diff / 3600000)} ч назад`;
    } else {
      return `${Math.floor(diff / 86400000)} д назад`;
    }
  };
  
  return (
    <div className="news-container" style={{ backgroundImage: `url()` }}>
      <div className="news-overlay">
        <div className="news-header">
          <h1 className="news-title">SOSA <span className="news-title-accent">NEWS</span></h1>
          <p className="news-description">
            Анонимные сообщения от сообщества. Делись инсайдами, теориями и новостями из мира ПЛТН.
          </p>
        </div>
        
        <div className="news-controls">
          <div className="tags-filter">
            {allTags.map(tag => (
              <button 
                key={tag}
                className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="sort-controls">
            <label>СОРТИРОВКА:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Новые</option>
              <option value="popular">Популярные</option>
              <option value="discussed">Обсуждаемые</option>
            </select>
          </div>
          
          <button 
            className="neon-button new-post-btn"
            onClick={() => setShowPostForm(!showPostForm)}
          >
            {showPostForm ? 'ОТМЕНА' : 'НОВАЯ ПУБЛИКАЦИЯ'}
          </button>
        </div>
        
        {/* Форма для новой публикации */}
        {showPostForm && (
          <div className="post-form-container">
            <h2>СОЗДАТЬ ПУБЛИКАЦИЮ</h2>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <label>Заголовок</label>
                <input 
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handlePostChange}
                  required
                  maxLength={100}
                />
              </div>
              
              <div className="form-group">
                <label>Содержание</label>
                <textarea 
                  name="content"
                  value={newPost.content}
                  onChange={handlePostChange}
                  required
                  maxLength={2000}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Теги (через запятую)</label>
                <input 
                  type="text"
                  name="tags"
                  value={newPost.tags}
                  onChange={handlePostChange}
                  placeholder="теория, мерч, концерт..."
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Изображение (опционально)</label>
                  <input 
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                
                <div className="form-group">
                  <label>Аудио (опционально)</label>
                  <input 
                    type="file"
                    name="audio"
                    onChange={handleFileChange}
                    accept="audio/*"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowPostForm(false)}>
                  ОТМЕНА
                </button>
                <button type="submit" className="neon-button">
                  ОПУБЛИКОВАТЬ
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Лента публикаций */}
        <div className="posts-feed">
          {sortedPosts().map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author">{post.author}</div>
                <div className="post-time">{formatDate(post.timestamp)}</div>
              </div>
              
              <h2 className="post-title">{post.title}</h2>
              
              <div className="post-content">
                <p>{post.content}</p>
                
                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                
                {post.audio && (
                  <div className="post-audio">
                    <audio controls>
                      <source src={post.audio} type="audio/mp3" />
                      Твой браузер не поддерживает аудио.
                    </audio>
                  </div>
                )}
              </div>
              
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="post-tag"
                    onClick={() => setActiveTag(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="post-actions">
                <button 
                  className="like-btn"
                  onClick={() => handleLike(post.id)}
                >
                  <span className="like-icon">❤</span>
                  <span className="like-count">{post.likes}</span>
                </button>
                
                <div className="comments-count">
                  <span className="comment-icon">💬</span>
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
          
          {sortedPosts().length === 0 && (
            <div className="no-posts">
              <p>Нет публикаций по выбранному тегу</p>
              <button 
                className="neon-button"
                onClick={() => setActiveTag('все')}
              >
                ПОКАЗАТЬ ВСЕ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;