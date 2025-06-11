const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión MariaDB
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5
});

// Test de conexión
pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión a MariaDB exitosa');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a MariaDB:', err);
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Recooba funcionando 🚀');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});

const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);  // 

const authRoutes = require('./routes/auth');
app.use('/login', authRoutes);

const garantiasRoutes = require('./routes/garantias');
app.use('/garantias', garantiasRoutes);