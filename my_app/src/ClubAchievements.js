import React, { Component } from 'react';
class ClubAchievements extends Component {
  render() {
    const { medals, cups, goals } = this.props.achievements;
    return (
      <div className="mb-3">
        <h5>Досягнення</h5>
        <ul>
          <li>Медалі: {medals}</li>
          <li>Кубки: {cups}</li>
          <li>Забиті голи: {goals}</li>
        </ul>
      </div>
    );
  }
}
export default ClubAchievements;