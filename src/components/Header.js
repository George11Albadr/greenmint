// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de tener un archivo CSS con los estilos necesarios.

function Header({ onLoginClick, isAuthenticated, onLogout }) {
    return (
        <header>
            <h2 className="logo">Greenmint</h2>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="#">About Us</Link>
                <Link to="/menu">Menus</Link>
                <Link to="/search">Search</Link>
                <Link to="/meal">Meal</Link>
                {isAuthenticated ? (
                    <button onClick={onLogout} className="btnLogin-popup">Logout</button>
                ) : (
                    <button onClick={onLoginClick} className="btnLogin-popup">Login</button>
                )}
            </nav>
        </header>
    );
}

export default Header;
