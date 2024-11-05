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

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas
app.get('/api/Usuarios/:id_user', async (req, res) => {
    const { id_user } = req.params; 
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

app.get('/api/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Productos"');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar los productos');
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body; 
    try {
        const result = await pool.query('SELECT * FROM "Usuarios" WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password; 
            const isMatch = await bcrypt.compare(password, hashedPassword); 
            if (isMatch) {
                res.json({ success: true, user: { id: user.id_user, username: user.username } });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).send('Error al iniciar sesión: ' + err.message);
    }
});

app.post('/api/register', async (req, res) => {
    const { nombre, apellido, username, password, direccion, telefono, email, pais } = req.body;
    try {
        const userCheck = await pool.query('SELECT * FROM "Usuarios" WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El nombre de usuario ya está en uso.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO "Usuarios" (nombre, apellido, username, password, direccion, telefono, mail, pais) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, apellido, username, hashedPassword, direccion, telefono, email, pais]
        );
        const newUser = result.rows[0];
        res.status(201).json({ success: true, user: { id: newUser.id_user, username: newUser.username } });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ success: false, message: 'Error al registrar usuario', error: err.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});






