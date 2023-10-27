import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h2 className="logo">Greenmint</h2>
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="#">About Us</Link>
                <Link to="/menu">Menus</Link>
                <Link to="/search">Search</Link>
                <Link to="/meal">Meal</Link>
                {/* Asegúrate de modificar el botón de Login para que funcione según lo planeado */}
                <button className="btnLogin-popup">Login</button>
            </nav>
        </header>
    );
}

export default Header;
