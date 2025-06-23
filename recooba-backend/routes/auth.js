const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Log de entrada
  console.log('🟡 Solicitud de login recibida:', req.body);

  if (!email || !password) {
    console.warn('⚠️ Faltan campos en la solicitud');
    return res.status(400).json({ error: 'Faltan email o contraseña' });
  }

  try {
    const conn = await pool.getConnection();

    const rows = await conn.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    conn.release();

    if (rows.length === 0) {
      console.warn('⚠️ Usuario no encontrado:', email);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      console.warn('⚠️ Contraseña incorrecta para:', email);
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    console.log('✅ Usuario autenticado:', usuario.email);

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (err) {
    console.error('❌ Error en el servidor:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
