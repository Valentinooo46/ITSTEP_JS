import React from "react";

function Band() {
  const members = ["Сергій Кузьмінський", "Олександ Ємець", "Ігор Мельничук", "Павло Крахмальов"];
  const albums = [
    { title: "Вродило!", cover: "https://upload.wikimedia.org/wikipedia/uk/7/74/Vrodylo.jpg" },
    { title: "Ми - хлопці з Бандерштату", cover: "https://upload.wikimedia.org/wikipedia/uk/e/e1/Bratyanders.jpeg" }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Моя улюблена група: Брати Гадюкіни</h1>
      <h3>Учасники:</h3>
      <ul>
        {members.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <h3>Альбоми:</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        {albums.map((a, i) => (
          <div key={i}>
            <p>{a.title}</p>
            <img src={a.cover} alt={a.title} width="150" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Band;