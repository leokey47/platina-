import React from "react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      {/* Видеофон */}
      <video className="background-video" autoPlay loop muted>
        <source src="/photos/rat_main.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="content">
        <h1>Добро пожаловать в заброшенный подвал</h1>
        <div className="video-container">
          <video
            className="video"
            src="/IMG_7714.MP4"
            type="video/mp4"
            autoPlay
            loop
            muted
            controls
          ></video>
        </div>
        <div className="graffiti"></div>
        <div className="rats-animations">
          {/* Здесь могут быть гифки с бегущими крысами */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
