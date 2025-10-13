function PetCard({ name, type, age, breed, photo }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={photo} alt="Pet" style={{ width: '300px' }} />
      <p> Тип: {type}</p>
      <p> Порода: {breed}</p>
      <p> Вік: {age} роки(-ів)</p>
    </div>
  );
}

export default PetCard;