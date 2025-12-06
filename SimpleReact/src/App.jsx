import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import UserForm from './UserForm';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_ALL = 'https://lohika.itstep.click/api/Users/all';
    const API_BASE = 'https://lohika.itstep.click/api/Users';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_ALL);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleAdd = (newUser) => {
        setUsers(prev => [newUser, ...prev]);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Confirm deleting user')) return;
        try {
            const res = await fetch(`${API_BASE}/delete/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Delete failed: ${res.status} ${text}`);
            }
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            alert('Error while deleting: ' + (err.message || 'Error'));
        }
    };

    if (loading) return <div>Downloading users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="app-container">
            <h1>List users</h1>

            <UserForm onAdd={handleAdd} />

            <div className="user-list">
                {users.map(user => (
                    <UserCard key={user.id} user={user} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

export default App;
