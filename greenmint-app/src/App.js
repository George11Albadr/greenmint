// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm'; // Asegúrate de tener este componente
import Menu from './components/Menu';
import Search from './components/Search';
import Meal from './components/Meal';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLogin = (status) => {
        setIsAuthenticated(status);
        setShowLoginForm(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <Header
                    onLoginClick={() => setShowLoginForm(true)}
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                />
                {showLoginForm && !isAuthenticated && (
                    <LoginForm onLogin={handleLogin} onClose={() => setShowLoginForm(false)} />
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
