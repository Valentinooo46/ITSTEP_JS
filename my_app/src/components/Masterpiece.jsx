import { useParams } from "react-router-dom";
 
function Masterpiece() {
    const {name} = useParams();
  return (
    <div className="container mt-4">
        <h2>Привіт {name}! Тут показують шедеври Джакомо Балли</h2>
      <h2 className="text-center">Найвідоміша картина</h2>
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <img
          src="https://uploads8.wikiart.org/images/giacomo-balla/dynamism-of-a-dog-on-a-leash-1912.jpg"
          className="card-img-top"
          alt="Dynamism of a Dog on a Leash"
        />
        <div className="card-body">
          <h5 className="card-title">Dynamism of a Dog on a Leash</h5>
          <p className="card-text">Ця картина 1912 року передає рух за допомогою повторення форм і ліній — класика футуризму.</p>
        </div>
      </div>
    </div>
  );
}
export default Masterpiece;