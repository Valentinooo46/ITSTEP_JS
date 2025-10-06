import React, { Component } from 'react';
class ClubSquad extends Component {
  render() {
    const { squad } = this.props;
    return (
      <div>
        <h5>Склад команди</h5>
        <ul>
          {squad.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ClubSquad;