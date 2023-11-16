// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Si estás utilizando Express 4.16+ ya viene con un body-parser incorporado
const { Pool } = require('pg');

// Conectarse a la base de datos de PostgreSQL
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'greenmint',
    password: 'root',
    port: 5432,
});

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Analizar las solicitudes de contenido tipo JSON
app.use(bodyParser.json());

// Ruta de autenticación
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Aquí se realiza la lógica de autenticación contra la base de datos
        // Este es solo un ejemplo simple sin hashing de contraseñas para propósitos de demostración
        const queryResult = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, password]);

        if (queryResult.rows.length > 0) {
            // Usuario autenticado con éxito
            res.json({ success: true, message: 'Autenticación exitosa.' });
        } else {
            // Autenticación fallida
            res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(500).json({ success: false, message: 'Error del servidor.' });
    }
});

// Configurar el servidor para escuchar en un puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
