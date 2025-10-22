import { useParams } from "react-router-dom";
 
function Gallery() {
    const {name} = useParams();
  return (
    <div className="container mt-4">
        <h2>Привіт {name}! Тут показують шедеври Джакомо Балли</h2>
      <h2 className="text-center mb-4">Галерея футуристичних робіт Балли</h2>
      <div className="row">
        {[
          {
            title: 'Abstract Speed + Sound',
            year: '1913–14',
            img: 'https://uploads0.wikiart.org/images/giacomo-balla/abstract-speed-sound-1914.jpg'
          },
          {
            title: 'Street Light',
            year: '1910–11',
            img: 'https://uploads2.wikiart.org/images/giacomo-balla/street-light-1909.jpg!Large.jpg'
          },
          {
            title: 'Velocity of Cars',
            year: '1913',
            img: 'https://uploads1.wikiart.org/images/giacomo-balla/velocity-of-an-automobile.jpg!Large.jpg'
        }
        ].map((painting, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img src={painting.img} className="card-img-top" alt={painting.title} />
              <div className="card-body">
                <h5 className="card-title">{painting.title}</h5>
                <p className="card-text">{painting.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Gallery;