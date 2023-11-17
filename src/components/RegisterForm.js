// RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                password: password,
                username: username
            }
        };

        try {
            const response = await axios.request(options);
            console.log('API Response:', response.data);
            onRegister(true);
        } catch (error) {
            console.error('API Call Failed:', error);
            if (error.response) {
                console.error('Register Error:', error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
            onRegister(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Inputs for username, email, and password */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
