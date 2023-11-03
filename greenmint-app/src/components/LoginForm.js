// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                password: password
            }
        };

        try {
            const response = await axios.request(options);
            console.log('API Response:', response.data);
            onLogin(true);
        } catch (error) {
            console.error('API Call Failed:', error);
            if (error.response) {
                // Si el servidor devuelve un mensaje de error
                console.error('Login Error:', error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
            onLogin(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box login">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
