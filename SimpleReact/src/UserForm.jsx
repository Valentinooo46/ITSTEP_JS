import React, { useState } from 'react';

const API_BASE = 'https://lohika.itstep.click/api/Users';

const UserForm = ({ onAdd }) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const reset = () => {
        setFirstName('');
        setSecondName('');
        setEmail('');
        setPhone('');
        setPhoto('');
        setError(null);
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError(null);
        if (!password) {
            setError('Password required!');
            return;
        }
        if (!confirmPassword) {
            setError('Confirm password');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords not equal!');
            return;
        }
        const payload = {
            firstName: firstName.trim(),
            secondName: secondName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            photo: photo.trim(),
            password: password,
            confirmPassword: confirmPassword
        };
        setSubmitting(true);
        try {
            const res = await fetch(`${API_BASE}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                
                let text = await res.text();
                try {
                    const json = JSON.parse(text);
                    if (json && json.errors) {
                        
                        const messages = Object.values(json.errors)
                            .flat()
                            .map(m => String(m))
                            .join('; ');
                        throw new Error(messages || res.statusText);
                    } else if (json && json.title) {
                        throw new Error(json.title);
                    } 
                } catch {
                    
                    throw new Error(text || `Server error ${res.status}`);
                }
            }

            const created = await res.json();
           
            const newUser = created && created.id ? created : { id: Date.now(), ...payload };
            onAdd(newUser);
            reset();
        } catch (err) {
            setError(err.message || 'Error while adding');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>Добавить пользователя</h2>
            <div>
                <label>Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div>
            <div>
                <label>Surname</label>
                <input value={secondName} onChange={e => setSecondName(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Fax</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Photo(Base64)</label>
                <input value={photo} onChange={e => setPhoto(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>

            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            <button type="submit" disabled={submitting} style={{ marginTop: 8 }}>
                {submitting ? 'Adding...' : 'Add'}
            </button>
        </form>
    );
};

export default UserForm;