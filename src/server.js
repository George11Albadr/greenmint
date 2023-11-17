const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Inicializa Firebase Admin con tus credenciales
const serviceAccount = require('./greenmint-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userRef = db.collection('users');
        await userRef.add({ username, email, password });
        res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener todos los usuarios (demostrativo, en un entorno real deberías tener cuidado con exponer esta información)
app.get('/api/users', async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const users = snapshot.docs.map(doc => doc.data());
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error en el servidor');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});