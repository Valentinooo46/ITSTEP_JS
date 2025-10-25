import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventStore } from '../flux/EventStore';
import { EventActions } from '../flux/EventActions';

export default function EventCard({ event }) {
  const [favorites, setFavorites] = useState(EventStore.getFavorites());
  const isFav = favorites.includes(event.id);

  useEffect(() => {
    const unsubscribe = EventStore.addChangeListener(() => {
      setFavorites(EventStore.getFavorites());
    });
    return unsubscribe;
  }, []);

  const date = new Date(event.date).toLocaleString('uk-UA', {
    dateStyle: 'medium', timeStyle: 'short'
  });

  return (
    <div style={{
      border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '200px 1fr', gap: 12
    }}>
      <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ padding: 12 }}>
        <h3 style={{ marginTop: 0 }}>{event.title}</h3>
        <p style={{ margin: '6px 0' }}><strong>Місце:</strong> {event.venue}</p>
        <p style={{ margin: '6px 0' }}><strong>Час:</strong> {date}</p>
        <p style={{ margin: '6px 0' }}><strong>Категорія:</strong> {event.category}</p>
        <p style={{ margin: '6px 0' }}><strong>Ціна:</strong> {event.price} грн</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Link to={`/event/${event.id}`} style={{ padding: '6px 10px', border: '1px solid #333', borderRadius: 6 }}>
            Деталі
          </Link>
          <button
            onClick={() => isFav ? EventActions.removeFavorite(event.id) : EventActions.addFavorite(event.id)}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #333' }}
          >
            {isFav ? 'Видалити з обраних' : 'Додати до обраних'}
          </button>
        </div>
      </div>
    </div>
  );
}