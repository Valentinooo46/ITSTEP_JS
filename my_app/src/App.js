import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import Profile from './components/Profile';
import Clock from './components/React-clock';
import PetCard from './components/Pet';


function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}> Фільм</Link>
        <Link to="/profile" style={{ marginRight: 10 }}> Персональна сторінка</Link>
        <Link to="/clock" style={{ marginRight: 10 }}> Годинник</Link>
        <Link to="/pet"> Улюбленець</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MovieCard
          title="Некерований"
          director="Тоні Скотт"
          year="2011"
          studio="20th Century Fox"
          poster="https://image.tmdb.org/t/p/original/zKvHwL0GqLOear8rTnUPSTRYY0r.jpg"
        />
        } />
        <Route path="/profile" element={<Profile
          name="Валентин К."
          phone="+380123456789"
          email="valentino@example.com"
          city="Луцьк"
          experience="1 рік у веб-розробці / 2 роки у розробці ПЗ"
          skills={['React', 'Bootstrap', 'JavaScript', 'С++', 'С#']}
        />
        } />
        <Route path="/clock" element={<Clock />} />
        <Route path="/pet" element={<PetCard
          name="Туман"
          type="Кіт"
          age={3}
          breed="Британський короткошерстий"
          photo="https://th.bing.com/th/id/R.f1f2fa2ccfc6ccc8257e26d55cc5de2d?rik=uyl8cN8XChOPgg&riu=http%3a%2f%2fwww.zastavki.com%2fpictures%2foriginals%2f2014%2fAnimals___Cats_Beautiful_British_Shorthair_092198_.jpg&ehk=axMsRoPmcxUSoga8C2sBu6Tk1ZVkOVvTdzM3XEjvoDw%3d&risl=&pid=ImgRaw&r=0"
        />
        } />
      </Routes>
    </div>
  );
}

export default App;