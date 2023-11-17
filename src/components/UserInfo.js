import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import './UserInfo.css';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

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
                setError('Error al cargar la información del usuario.');
            }
        };
        fetchUserInfo();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadProfilePicture(file);
            await saveProfilePictureUrl(userInfo.id, url);
            // Opcional: Recargar la información del usuario
        } catch (error) {
            console.error('Error al subir la foto de perfil:', error);
            setError('Error al subir la foto de perfil.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="userInfo-container">
            {error && <p>Error: {error}</p>}
            {userInfo ? (
                <div>
                    <h3>Información del Usuario:</h3>
                    <p>Nombre: {userInfo.username}</p>
                    <p>Correo: {userInfo.email}</p>
                </div>
            ) : (
                <p>Cargando información del usuario...</p>
            )}
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit} disabled={uploading}>
                    {uploading ? 'Subiendo...' : 'Subir Foto de Perfil'}
                </button>
            </div>
        </div>
    );
};

// Función para subir la imagen a Firebase Storage
const uploadProfilePicture = async (file) => {
    if (!file) return;

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const fileRef = storageRef(storage, `profilePictures/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};

// Función para guardar la URL de la imagen en Firestore
const saveProfilePictureUrl = async (userId, url) => {
    try {
        await axios.post('http://localhost:3001/api/updateProfilePicture', {
            userId,
            profilePictureUrl: url
        });
    } catch (error) {
        console.error('Error al guardar la URL de la foto de perfil:', error);
    }
};

export default UserInfo;