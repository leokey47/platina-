// src/Page2.js
import React from 'react';

const TourPage = () => {
  return (
    <div>
      <video className="background-video" autoPlay loop muted>
        <source src="/photos/dov_back.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
};

export default TourPage;
 
