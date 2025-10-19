import React, { useState } from "react";

export default function AdminPanel({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, price, size: parseInt(size) });
    setName("");
    setPrice("");
    setSize(1);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Назва товару"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Ціна"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value={1}>1 колонка</option>
        <option value={2}>2 колонки</option>
        <option value={3}>3 колонки</option>
      </select>
      <button type="submit">Додати товар</button>
    </form>
  );
}