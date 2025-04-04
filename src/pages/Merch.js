import React, { useState, useEffect } from 'react';
import './Merch.css';

// Импорт изображений (в реальном проекте)
// import merchBg from 'https://example.com/placeholder-image.jpg';

// Генерация фейковых данных о продуктах (в реальном проекте будет API)
const products = [
  {
    id: 1,
    name: "Футболка 'GOBLIN STYLE'",
    price: 2500,
    description: "Чёрная футболка с принтом гоблина и неоновыми элементами.",
    imageUrl: "https://via.placeholder.com/300",
    category: "clothing",
    stock: 15,
    isDropping: true,
    dropEndsAt: new Date(Date.now() + 3600000) // +1 час
  },
  {
    id: 2,
    name: "Худи '300 RATS'",
    price: 4500,
    description: "Худи с капюшоном, принт с крысами и надписью '300 RATS'.",
    imageUrl: "https://via.placeholder.com/300",
    category: "clothing",
    stock: 10,
    isDropping: true,
    dropEndsAt: new Date(Date.now() + 7200000) // +2 часа
  },
  {
    id: 3,
    name: "Кепка 'PLTN'",
    price: 1800,
    description: "Чёрная кепка с вышивкой 'PLTN' светоотражающей нитью.",
    imageUrl: "https://via.placeholder.com/300",
    category: "accessories",
    stock: 20,
    isDropping: true,
    dropEndsAt: new Date(Date.now() + 10800000) // +3 часа
  },
  {
    id: 4,
    name: "Шоппер 'КИБЕР-КРЫСА'",
    price: 1200,
    description: "Холщовая сумка с принтом кибер-крысы.",
    imageUrl: "https://via.placeholder.com/300",
    category: "accessories",
    stock: 25,
    isDropping: false,
    dropEndsAt: null
  },
  {
    id: 5,
    name: "Значок '300'",
    price: 300,
    description: "Металлический значок с цифрой '300' в неоновом дизайне.",
    imageUrl: "https://via.placeholder.com/300",
    category: "accessories",
    stock: 50,
    isDropping: false,
    dropEndsAt: null
  },
  {
    id: 6,
    name: "Маска 'GOBLIN MASK'",
    price: 1000,
    description: "Тканевая маска с принтом зубов гоблина, светится в темноте.",
    imageUrl: "https://via.placeholder.com/300",
    category: "accessories",
    stock: 30,
    isDropping: false,
    dropEndsAt: null
  }
];

const Merch = () => {
  const [items, setItems] = useState(products);
  const [activeItem, setActiveItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [countdowns, setCountdowns] = useState({});
  const [ratPosition, setRatPosition] = useState({ left: '-50px', top: '50%' });
  const [showRat, setShowRat] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  // Обновление таймеров обратного отсчета
  useEffect(() => {
    const dropItems = items.filter(item => item.isDropping);
    if (dropItems.length === 0) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const newCountdowns = {};
      
      dropItems.forEach(item => {
        const diff = item.dropEndsAt - now;
        if (diff <= 0) {
          // Истекло время дропа
          setItems(prevItems => 
            prevItems.map(prevItem => 
              prevItem.id === item.id 
                ? { ...prevItem, isDropping: false, dropEndsAt: null } 
                : prevItem
            )
          );
        } else {
          // Вычисляем оставшееся время
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          newCountdowns[item.id] = {
            hours,
            minutes,
            seconds
          };
        }
      });
      
      setCountdowns(newCountdowns);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [items]);
  
  // Фильтрация товаров
  const filteredItems = () => {
    if (filter === 'all') return items;
    if (filter === 'dropping') return items.filter(item => item.isDropping);
    return items.filter(item => item.category === filter);
  };
  
  // Открыть детали товара
  const openItemDetails = (item) => {
    setActiveItem(item);
    setShowRat(true);
    
    // Анимация крысы
    const randomTop = Math.floor(Math.random() * 70) + 15;
    setRatPosition({ left: '-50px', top: `${randomTop}%` });
    
    setTimeout(() => {
      setRatPosition({ left: 'calc(100% + 50px)', top: `${randomTop}%` });
      
      setTimeout(() => {
        setShowRat(false);
      }, 2000);
    }, 100);
  };
  
  // Закрыть детали товара
  const closeItemDetails = () => {
    setActiveItem(null);
  };
  
  // Добавить товар в корзину
  const addToCart = (item) => {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    
    if (existing) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    closeItemDetails();
  };
  
  // Удалить товар из корзины
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // Изменить количество товара в корзине
  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: qty } : item
    ));
  };
  
  // Посчитать итоговую сумму
  const cartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Компонент для деталей товара
  const ItemDetails = ({ item, onClose, onAddToCart }) => {
    return (
      <div className="item-details-overlay">
        <div className="item-details">
          <button className="close-btn" onClick={onClose}>×</button>
          <div className="item-details-content">
            <div className="item-image-container">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              
              {item.isDropping && countdowns[item.id] && (
                <div className="drop-countdown">
                  <span>ДРОП ЗАКОНЧИТСЯ ЧЕРЕЗ:</span>
                  <div className="countdown-timer">
                    <div className="time-block">
                      <span className="time">{countdowns[item.id].hours}</span>
                      <span className="label">Ч</span>
                    </div>
                    <div className="time-block">
                      <span className="time">{countdowns[item.id].minutes}</span>
                      <span className="label">М</span>
                    </div>
                    <div className="time-block">
                      <span className="time">{countdowns[item.id].seconds}</span>
                      <span className="label">С</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="item-info">
              <h2>{item.name}</h2>
              <p className="price">{item.price} ₽</p>
              <p className="description">{item.description}</p>
              <p className="stock">
                {item.stock > 0 
                  ? `В наличии: ${item.stock} шт.` 
                  : "Нет в наличии"}
              </p>
              
              <button 
                className="neon-button add-to-cart-btn" 
                onClick={() => onAddToCart(item)}
                disabled={item.stock <= 0}
              >
                {item.isDropping ? "УСПЕТЬ КУПИТЬ" : "В КОРЗИНУ"}
              </button>
              
              {item.isDropping && (
                <p className="drop-info">
                  Эксклюзивный дроп! Ограниченная серия.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Компонент корзины
  const Cart = ({ items, onClose, onRemove, onUpdateQty }) => {
    return (
      <div className="cart-overlay">
        <div className="cart-container">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>КОРЗИНА</h2>
          
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Ваша корзина пуста</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">{item.price} ₽</p>
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="item-quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn" 
                      onClick={() => onRemove(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-total">
                <p>Итого: <span>{cartTotal()} ₽</span></p>
              </div>
              
              <button className="neon-button checkout-btn">
                ОФОРМИТЬ ЗАКАЗ
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="merch-container" style={{ backgroundImage: `url()` }}>
      <div className="merch-overlay">
        <div className="merch-header">
          <h1 className="merch-title">SOSA <span className="drop-text">DROP</span></h1>
          <p className="merch-description">
            Эксклюзивный мерч для истинных фанатов. Дроп-коллекции доступны ограниченное время.
          </p>
        </div>
        
        <div className="merch-controls">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              ВСЕ
            </button>
            <button 
              className={`filter-btn ${filter === 'dropping' ? 'active' : ''}`}
              onClick={() => setFilter('dropping')}
            >
              ДРОП
            </button>
            <button 
              className={`filter-btn ${filter === 'clothing' ? 'active' : ''}`}
              onClick={() => setFilter('clothing')}
            >
              ОДЕЖДА
            </button>
            <button 
              className={`filter-btn ${filter === 'accessories' ? 'active' : ''}`}
              onClick={() => setFilter('accessories')}
            >
              АКСЕССУАРЫ
            </button>
          </div>
          
          <button 
            className="neon-button cart-btn"
            onClick={() => setShowCart(true)}
          >
            КОРЗИНА ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
        
        <div className="products-grid">
          {filteredItems().map(item => (
            <div 
              key={item.id} 
              className={`product-card ${item.isDropping ? 'dropping' : ''}`}
              onClick={() => openItemDetails(item)}
            >
              <div className="product-image-container">
                <img src={item.imageUrl} alt={item.name} className="product-image" />
                
                {item.isDropping && countdowns[item.id] && (
                  <div className="product-countdown">
                    <span>
                      {`${countdowns[item.id].hours}ч ${countdowns[item.id].minutes}м ${countdowns[item.id].seconds}с`}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">{item.price} ₽</p>
                {item.isDropping && <span className="drop-label">ДРОП</span>}
              </div>
            </div>
          ))}
        </div>
        
        {/* Если нет элементов после фильтрации */}
        {filteredItems().length === 0 && (
          <div className="no-products">
            <p>Товары не найдены</p>
            <button 
              className="neon-button"
              onClick={() => setFilter('all')}
            >
              ПОКАЗАТЬ ВСЕ
            </button>
          </div>
        )}
        
        {/* Бегущая крыса при открытии товара */}
        {showRat && (
          <div 
            className="running-rat"
            style={{ 
              left: ratPosition.left, 
              top: ratPosition.top,
              transition: ratPosition.left === '-50px' ? 'none' : 'left 2s linear'
            }}
          ></div>
        )}
        
        {/* Модальное окно с деталями товара */}
        {activeItem && (
          <ItemDetails 
            item={activeItem} 
            onClose={closeItemDetails}
            onAddToCart={addToCart}
          />
        )}
        
        {/* Модальное окно корзины */}
        {showCart && (
          <Cart 
            items={cart} 
            onClose={() => setShowCart(false)}
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
          />
        )}
      </div>
    </div>
  );
};

export default Merch;