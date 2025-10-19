import React from "react";

function Recipe() {
  const ingredients = [
    { name: "Картопля", amount: "500 г" },
    { name: "Молоко", amount: "200 мл" },
    { name: "Масло вершкове", amount: "50 г" },
    { name: "Сіль", amount: "за смаком" }
  ];

  const steps = [
    "Очистити та відварити картоплю.",
    "Злити воду та розім’яти картоплю.",
    "Додати молоко та масло.",
    "Посолити і перемішати до однорідності."
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Рецепт: Картопляне пюре</h1>
      <h3>Інгредієнти:</h3>
      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>{ing.name} — {ing.amount}</li>
        ))}
      </ul>
      <h3>Приготування:</h3>
      <ol>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLpDt-vmZlq13JEWHS_NeNrYcWoxFhDxHg5w&s" 
        alt="Картопляне пюре" 
        width="250" 
      />
    </div>
  );
}

export default Recipe;