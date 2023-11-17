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

// Ruta para el login de usuario
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();

        if (snapshot.empty) {
            return res.status(401).send('Usuario no encontrado');
        }

        const user = snapshot.docs[0].data();
        if (user.password === password) {
            // Considera implementar una forma más segura de manejar las contraseñas
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Contraseña incorrecta');
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener todos los usuarios
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
