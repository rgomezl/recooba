const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const conn = await pool.getConnection();

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await conn.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    conn.release();

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      id: Number(result.insertId)
    });

  } catch (err) {
    console.error(err);

    if (err.errno === 1062) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

module.exports = router;
