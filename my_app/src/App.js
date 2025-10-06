
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubCard from './ClubCard';
import MagicBall from './MagicBall';



class App extends Component {
  bootstrapStyles = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
  getRandomStyle =() => {
  const index = Math.floor(Math.random() * this.bootstrapStyles.length);
  return this.bootstrapStyles[index];
}
  render() {
    const clubs = [
      {
        name: 'FC Dynamo Kyiv',
        city: 'Kyiv',
        founded: 1927,
        logo: 'https://th.bing.com/th/id/OSK.aK_98i-UcbEvLwoUvXefOdXBnAe_tKjXy__VXG5bdpY?w=102&h=102&c=7&o=6&cb=12&pid=SANGAM',
        achievements: {
          medals: 15,
          cups: 10,
          goals: 1200,
        },
        squad: ['Шапаренко', 'Бущан', 'Циганков'],
        style: this.getRandomStyle(),
      },
      {
        name: 'FC Shakhtar Donetsk',
        city: 'Donetsk',
        founded: 1936,
        logo: 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/a2/FC_Shakhtar_Donetsk_Logo.svg/250px-FC_Shakhtar_Donetsk_Logo.svg.png',
        achievements: {
          medals: 18,
          cups: 13,
          goals: 1350,
        },
        squad: ['Степаненко', 'Матвієнко', 'Traore'],
        style: this.getRandomStyle(),
      },
    ];

    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">Футбольні клуби України</h1>
        <div className="row">
          {clubs.map((club, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <ClubCard club={club} />
            </div>
          ))}
        </div>
        <MagicBall />
      </div>
    );
  }
}

export default App;
