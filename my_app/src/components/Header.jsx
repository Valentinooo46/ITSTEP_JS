import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '12px 20px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Події Луцька</h1>
      </Link>
      <nav style={{ marginTop: 8, display: 'flex', gap: 16 }}>
        <NavLink to="/" end>Головна</NavLink>
        <NavLink to="/favorites">Обрані</NavLink>
      </nav>
    </header>
  );
}