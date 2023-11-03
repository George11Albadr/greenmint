import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import Search from './components/Search';
import Meal from './components/Meal';
import RouteWrapper from './components/RouteWrapper'; // Asegúrate de importar RouteWrapper
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
                    onLoginClick={() => setShowLoginForm(!showLoginForm)}
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                />
                {showLoginForm && !isAuthenticated && (
                    <LoginForm onLogin={handleLogin} onClose={() => setShowLoginForm(false)} />
                )}
                <RouteWrapper showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm}>
                    <Routes>
                        <Route path="/" element={<></>} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/meal" element={<Meal />} />
                    </Routes>
                </RouteWrapper>
            </div>
        </Router>
    );
}

export default App;
