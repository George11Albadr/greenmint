import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import Search from './components/Search';
import Meal from './components/Meal';
import Home from './components/Home';
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

    return (
        <Router>
            <div>
                <Header
                    onLoginClick={() => setShowLoginForm(!showLoginForm)}
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                />
                {showLoginForm && !isAuthenticated && (
                    <div className="form-backdrop">
                        <LoginForm onLogin={handleLogin} />
                    </div>
                )}
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/meal" element={<Meal />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;