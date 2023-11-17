import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (token) {
                    const response = await axios.get('http://localhost:3001/api/userinfo', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserInfo(response.data);
                }
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
                // Manejar el error adecuadamente aquí
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            {userInfo ? (
                <div>
                    <h3>Información del Usuario:</h3>
                    <p>Nombre: {userInfo.name}</p>
                    {/* Renderizar otros datos del usuario aquí */}
                </div>
            ) : (
                <p>Cargando información del usuario...</p>
            )}
        </div>
    );
};

export default UserInfo;
