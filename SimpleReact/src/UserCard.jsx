import React from 'react';
import './UserCard.css'; 

const UserCard = ({ user, onDelete }) => {
    const handleDelete = () => {
        if (onDelete) onDelete(user.id);
    };

    return (
        <div className="user-card">
            <img src={`https://lohika.itstep.click/images/200_${user.photo}`} alt={`${user.firstName} ${user.secondName}`} className="user-photo" />
            <div className="card-content">
                <h3>{user.firstName} {user.secondName}</h3>
                <p>Email: {user.email}</p>
                <p>Fax: {user.phone}</p>
            </div>
            <div className="card-actions">
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default UserCard;
