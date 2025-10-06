import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return '#' + hex.padStart(6, '0');
}
function Hello({id__}) {
    

  const { id } = useParams();
  if(id__ !== undefined){
    if(id__ === id){
        return <AdminPage />;
    }
    else{
        console.log("Input id:", id);
        console.log("Generated id:", id__);
        return <AccessDenied />;    
    }
}
    return <h1>Валідація не працює!</h1>;
 
}



function AdminPage() {
  const [active, setActive] = useState('home');
  const [bgColor, setBgColor] = useState('#343a40');
  const [textColor, setTextColor] = useState('#ffffff');
  const changeColor = () =>{
    setBgColor(getRandomHexColor());
    setTextColor(getRandomHexColor());
  }
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor }}>
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column p-3" style={{ width: '250px', backgroundColor: textColor, color: bgColor }}>
        <h4 className="text-white mb-4">Меню</h4>
        <nav className="nav nav-pills flex-column">
          <button
            className={`nav-link ${active === 'home' ? 'active' : ''}`}
            onClick={() => changeColor()}
          >
            Головна
          </button>
          <button
            className={`nav-link ${active === 'users' ? 'active' : ''}`}
            onClick={() => setActive('users')}
          >
            Користувачі
          </button>
          <button
            className={`nav-link ${active === 'settings' ? 'active' : ''}`}
            onClick={() => setActive('settings')}
          >
            Налаштування
          </button>
          <button
            className={`nav-link ${active === 'reports' ? 'active' : ''}`}
            onClick={() => setActive('reports')}
          >
            Звіти
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1 p-4">
        <h1>Hello Admin!!</h1>
        <p>Ласкаво просимо до панелі адміністратора. Тут ви можете керувати системою.</p>
      </div>
    </div>
  );
}
function AccessDenied() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="text-center">
        <h1 className="display-4 text-danger">Доступ заборонено</h1>
        <p className="lead">Ви ввели неправильний пароль або не маєте прав доступу до адмін-панелі.</p>
        <p>Якщо це помилка — зверніться до адміністратора системи.</p>
        <a href="/" className="btn btn-outline-light mt-3">Повернутися на головну</a>
      </div>
    </div>
  );
}

export default Hello;