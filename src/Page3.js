// src/Page3.js
import React from 'react';

const Page3 = () => {
  return (
    <div>
      <video className="background-video" autoPlay loop muted>
        <source src="/photos/plat_back.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
};

export default Page3;
