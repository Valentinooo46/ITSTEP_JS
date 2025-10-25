import { useEffect, useState } from 'react';
import { EventStore } from '../flux/EventStore';
import EventCard from '../components/EventCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(EventStore.getFavorites());
  const [events, setEvents] = useState(EventStore.getAll());
  const favEvents = events.filter(e => favorites.includes(e.id));

  useEffect(() => {
    const unsubscribe = EventStore.addChangeListener(() => {
      setFavorites(EventStore.getFavorites());
      setEvents(EventStore.getAll());
    });
    return unsubscribe;
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h2>Обрані події</h2>
      {favEvents.length === 0 ? (
        <p>Список обраних порожній.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {favEvents.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
      )}
    </main>
  );
}