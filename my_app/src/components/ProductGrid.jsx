import React from "react";


export default function ProductGrid({ products, columns }) {
  // Алгоритм розбиття на рядки
  let rows = [];
  let currentRow = [];
  let usedCols = 0;

  products.forEach((p) => {
    if (usedCols + p.size > columns) {
      rows.push(currentRow);
      currentRow = [];
      usedCols = 0;
    }
    currentRow.push(p);
    usedCols += p.size;
  });

  if (currentRow.length > 0) rows.push(currentRow);

  return (
    <div>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {row.map((p, idx) => (
            <ProductCard key={idx} product={p} />
          ))}
        </div>
      ))}
    </div>
  );
}
 function ProductCard({ product }) {
  return (
    <div
      style={{
        gridColumn: `span ${product.size}`,
        border: "1px solid #ccc",
        padding: "10px",
        background: "#f9f9f9",
      }}
    >
      <h3>{product.name}</h3>
      <p>Ціна: {product.price} ₴</p>
    </div>
  );
}