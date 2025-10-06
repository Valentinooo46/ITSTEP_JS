import React, { Component } from 'react';
class ClubInfo extends Component {
  render() {
    const { name, city, founded, logo } = this.props;
    return (
      <div className="mb-3">
        <img src={logo} alt={`${name} logo`} style={{ height: '60px' }} />
        <p><strong>Місто:</strong> {city}</p>
        <p><strong>Засновано:</strong> {founded}</p>
      </div>
    );
  }
}

export default ClubInfo;