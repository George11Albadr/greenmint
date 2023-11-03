import React, { useState } from 'react';
import './LoginForm.css'; // Asegúrate de tener este archivo en el mismo directorio.

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email && password) {
            onLogin(true);
        }
    };

    // Función para añadir la clase 'has-content' cuando el input tiene contenido
    const inputClassName = (value) => {
        return value ? 'has-content' : '';
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
                            className={inputClassName(email)}
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
                            className={inputClassName(password)}
                        />
                        <label>Password</label>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#" className="forgot">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;