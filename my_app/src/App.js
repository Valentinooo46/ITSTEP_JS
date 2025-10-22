import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Biography from './components/Biography';
import Masterpiece from './components/Masterpiece';
import Gallery from './components/Gallery';
import RegistrationForm from './components/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <nav className="p-3">
        <ul className="d-flex gap-3 list-unstyled mb-0">
          <li><Link to="/biography/Валентин">Біографія</Link></li>
          <li><Link to="/masterpiece/Валентин">Найвідоміша картина</Link></li>
          <li><Link to="/gallery/Валентин">Галерея</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/biography/:name" element={<Biography />} />
        <Route path="/masterpiece/:name" element={<Masterpiece />} />
        <Route path="/gallery/:name" element={<Gallery />} />
      </Routes>
      <RegistrationForm />
    </>
  );
}

export default App;