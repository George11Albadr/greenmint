const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Inicializa Firebase Admin con tus credenciales
const serviceAccount = require('./greenmint-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave secreta fuerte

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUserRef = await db.collection('users').add({ username, email, password });
        console.log("Nuevo usuario ID:", newUserRef.id); // ID del documento creado
        res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para el login de usuario
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
        return res.status(401).send('Usuario no encontrado');
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    if (user.password === password) {
        const token = jwt.sign({ userId: userDoc.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Contraseña incorrecta');
    }
});

// Ruta para obtener la información del usuario logueado
app.get('/api/userinfo', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;

        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.json(doc.data());
    } catch (error) {
        console.error('Error al obtener información del usuario:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para actualizar la URL de la foto de perfil del usuario
app.post('/api/updateProfilePicture', async (req, res) => {
    try {
        const { userId, profilePictureUrl } = req.body;
        const userRef = db.collection('users').doc(userId);
        await userRef.update({ profilePicture: profilePictureUrl });
        res.send('Foto de perfil actualizada con éxito');
    } catch (error) {
        console.error('Error al actualizar la foto de perfil:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para agregar una comida a la lista de favoritos del usuario
app.post('/api/addLikedMeal', async (req, res) => {
    try {
        const { mealId } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;

        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Actualiza la lista de comidas favoritas del usuario
        await userRef.update({
            likedMeals: admin.firestore.FieldValue.arrayUnion(mealId)
        });

        res.send('Comida agregada a favoritos');
    } catch (error) {
        console.error('Error al agregar comida a favoritos:', error);
        res.status(500).send('Error en el servidor');
    }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
