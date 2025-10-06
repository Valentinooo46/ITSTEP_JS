import React, { Component } from 'react';
import ClubInfo from './ClubInfo';
import ClubAchievements from './ClubAchievements';
import ClubSquad from './ClubSquad';
class ClubCard extends Component {
  render() {
    const { club } = this.props;
    const cardClass = `card border-${club.style}`;

    return (
      <div className={cardClass}>
        <div className={`card-header bg-${club.style} text-white`}>
          <h4>{club.name}</h4>
        </div>
        <div className="card-body">
          <ClubInfo {...club} />
          <ClubAchievements achievements={club.achievements} />
          <ClubSquad squad={club.squad} />
        </div>
      </div>
    );
  }
}
export default ClubCard;