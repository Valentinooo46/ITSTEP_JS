
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const API_URL = 'https://lohika.itstep.click/api/Users/all';

        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Downloading users...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="app-container">
            <h1>List users</h1>
            <div className="user-list">
                {users.map(user => (
                    
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default App;
