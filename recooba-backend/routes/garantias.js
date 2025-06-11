const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.post('/', async (req, res) => {
  const { usuario_id, producto, fecha_compra, duracion_meses, imagen_url } = req.body;

  if (!usuario_id || !producto || !fecha_compra || !duracion_meses) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const conn = await pool.getConnection();

    const result = await conn.query(
      'INSERT INTO garantias (usuario_id, producto, fecha_compra, duracion_meses, imagen_url) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, producto, fecha_compra, duracion_meses, imagen_url || null]
    );

    conn.release();

    res.status(201).json({
      message: 'Garantía registrada correctamente',
      id: Number(result.insertId)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar garantía' });
  }
});

module.exports = router;
