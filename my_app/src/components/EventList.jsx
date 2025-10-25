import { useEffect, useState } from 'react';
import { EventStore } from '../flux/EventStore';
import EventCard from './EventCard';

export default function EventList() {
  const [events, setEvents] = useState(EventStore.getAll());
  const [category, setCategory] = useState(EventStore.getCategoryFilter());

  useEffect(() => {
    const unsubscribe = EventStore.addChangeListener(() => {
      setEvents(EventStore.getAll());
      setCategory(EventStore.getCategoryFilter());
    });
    return unsubscribe;
  }, []);

  const filtered = category === 'Усі'
    ? events
    : events.filter(e => e.category === category);

  if (filtered.length === 0) {
    return <p>Немає подій у вибраній категорії.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
    </div>
  );
}