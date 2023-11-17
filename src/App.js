import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Menu from './components/Menu';
import Search from './components/Search';
import Meal from './components/Meal';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleLogin = (status) => {
        setIsAuthenticated(status);
        setShowLoginForm(false);
        setShowRegisterForm(false); // Asegúrate de ocultar el formulario de registro al iniciar sesión
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const closeLoginForm = (e) => {
            if (showLoginForm && e.target.className === 'form-backdrop') {
                setShowLoginForm(false);
            }
        };

        document.addEventListener('mousedown', closeLoginForm);
        return () => {
            document.removeEventListener('mousedown', closeLoginForm);
        };
    }, [showLoginForm]);

    const showRegister = () => {
        setShowLoginForm(false);
        setShowRegisterForm(true);
    };

    const showLogin = () => {
        setShowLoginForm(true);
        setShowRegisterForm(false);
    };

    return (
        <Router>
            <div>
                <Header
                    onLoginClick={showLogin}
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                />
                {showLoginForm && !isAuthenticated && (
                    <div className="form-backdrop">
                        <LoginForm onLogin={handleLogin} />
                        <button onClick={showRegister}>Sign Up</button>
                    </div>
                )}
                {showRegisterForm && !isAuthenticated && (
                    <div className="form-backdrop">
                        <RegisterForm onRegister={handleLogin} />
                        <button onClick={showLogin}>Back to Login</button>
                    </div>
                )}
                <Routes>
                    <Route path="/" element={<></>} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/meal" element={<Meal />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
