import CategoryFilter from '../components/CategoryFilter';
import EventList from '../components/EventList';

export default function HomePage() {
  return (
    <main style={{ padding: 20 }}>
      <CategoryFilter />
      <EventList />
    </main>
  );
}