const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Rutas
app.get('/api/usuarios/:id_user', async (req, res) => {
    const { id_user } = req.params; // Usamos el nombre correcto de la variable
    try {
        const result = await pool.query('SELECT * FROM "Usuarios" WHERE id_user = $1', [id_user]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta de usuario');
    }
});

// Endpoint para obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Productos"');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar los productos');
    }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM "Usuarios" WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, result.rows[0].password); // Verifica el hash
            if (isMatch) {
                res.json({ success: true, user: { id: result.rows[0].id_user, username: result.rows[0].username } });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al iniciar sesión');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});





