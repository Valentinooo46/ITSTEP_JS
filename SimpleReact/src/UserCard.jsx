
import React from 'react';
import './UserCard.css'; 

const UserCard = ({ user }) => {
    return (
        <div className="user-card">
            <img src={`https://lohika.itstep.click/images/200_${user.photo}`} alt={`${user.firstName} ${user.secondName}`} className="user-photo" />
            <div className="card-content">
                <h3>{user.firstName} {user.secondName}</h3>
                <p>Email: {user.email}</p>
                <p>Fax: {user.phone}</p>
            </div>
        </div>
    );
};

export default UserCard;
