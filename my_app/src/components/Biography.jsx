
import { useParams } from "react-router-dom";
 
function Biography() {
    const {name} = useParams();
  return (
    <div className="container mt-4">
        <h2>Привіт {name}! Тут написана біографія Джакомо Балли</h2>
      <h2 className="text-center">Біографія Джакомо Балли</h2>
      <p>
        Джакомо Балла (1871–1958) — італійський художник, один із засновників футуризму.
        Його роботи досліджували рух, швидкість, світло та технології. Був підписантом
        «Маніфесту футуристичного живопису» і створював абстрактні композиції, що передають динаміку.
      </p>
    </div>
  );
}
export default Biography;