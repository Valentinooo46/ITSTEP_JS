function MovieCard({ title, director, year, studio, poster }) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={poster} alt="Poster" style={{ width: '300px' }} />
      <p> Режисер: {director}</p>
      <p> Рік: {year}</p>
      <p> Студія: {studio}</p>
    </div>
  );
}

export default MovieCard;