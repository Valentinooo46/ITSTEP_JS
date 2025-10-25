import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventStore } from '../flux/EventStore';
import { EventActions } from '../flux/EventActions';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(EventStore.getById(id));
  const [favorites, setFavorites] = useState(EventStore.getFavorites());
  const isFav = favorites.includes(id);

  useEffect(() => {
    const unsubscribe = EventStore.addChangeListener(() => {
      setEvent(EventStore.getById(id));
      setFavorites(EventStore.getFavorites());
    });
    return unsubscribe;
  }, [id]);

  if (!event) {
    return (
      <main style={{ padding: 20 }}>
        <p>Подію не знайдено.</p>
        <Link to="/">Повернутись</Link>
      </main>
    );
  }

  const date = new Date(event.date).toLocaleString('uk-UA', {
    dateStyle: 'full', timeStyle: 'short'
  });

  return (
    <main style={{ padding: 20 }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }}>{'← До списку'}</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', borderRadius: 8 }} />
        <div>
          <h2 style={{ marginTop: 0 }}>{event.title}</h2>
          <p><strong>Місто:</strong> {event.city}</p>
          <p><strong>Місце:</strong> {event.venue}</p>
          <p><strong>Дата та час:</strong> {date}</p>
          <p><strong>Категорія:</strong> {event.category}</p>
          <p><strong>Ціна:</strong> {event.price} грн</p>
          <p style={{ marginTop: 8 }}>{event.description}</p>
          <button
            onClick={() => isFav ? EventActions.removeFavorite(id) : EventActions.addFavorite(id)}
            style={{ marginTop: 12, padding: '8px 12px', borderRadius: 6, border: '1px solid #333' }}
          >
            {isFav ? 'Видалити з обраних' : 'Додати до обраних'}
          </button>
        </div>
      </div>
    </main>
  );
}