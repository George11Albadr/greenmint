import React from 'react';

const Navbar = () => {
    const links = [
        {
            label: 'Inicio',
            to: '/',
        },
        {
            label: 'Películas',
            to: '/movies',
        },
        {
            label: 'Series',
            to: '/series',
        },
    ];

    return (
        <nav>
            <ul>
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.to}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
