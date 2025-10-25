import { useEffect, useState } from 'react';
import { EventStore } from '../flux/EventStore';
import { EventActions } from '../flux/EventActions';

const categories = ['Усі', 'Концерти', 'Театр', 'Кіно', 'Виставки'];

export default function CategoryFilter() {
  const [selected, setSelected] = useState(EventStore.getCategoryFilter());

  useEffect(() => {
    const unsubscribe = EventStore.addChangeListener(() => {
      setSelected(EventStore.getCategoryFilter());
    });
    return unsubscribe;
  }, []);

  return (
    <div style={{ margin: '12px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => EventActions.setCategoryFilter(cat)}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #ccc',
            background: selected === cat ? '#222' : '#fff',
            color: selected === cat ? '#fff' : '#000',
            cursor: 'pointer'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}