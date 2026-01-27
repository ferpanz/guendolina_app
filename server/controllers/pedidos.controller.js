import pool from '../config/db.js';

export const getAllPedidos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT p.id_pedido, p.usuario_id, p.detalles, p.total, p.estado, p.fecha_pedido, u.`user-name` as nombre_usuario FROM pedidos p LEFT JOIN users u ON p.usuario_id = u.idusers ORDER BY p.fecha_pedido DESC'
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error en getAllPedidos:', error.message);
    res.status(500).json({ error: 'Error fetching pedidos', details: error.message });
  }
};

export const createPedido = async (req, res) => {
  const { usuario_id, detalles, total, estado } = req.body;

  // Validar que los campos requeridos existan
  if (!usuario_id || detalles === undefined || total === undefined) {
    return res.status(400).json({ 
      error: 'Faltan campos requeridos',
      received: { usuario_id, detalles, total, estado }
    });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO pedidos (usuario_id, detalles, total, estado, fecha_pedido) VALUES (?, ?, ?, ?, NOW())',
      [usuario_id, detalles, total, estado || 'pendiente']
    );
    connection.release();
    res.status(201).json({ message: 'Pedido creado' });
  } catch (error) {
    console.error('Error creating pedido:', error);
    res.status(500).json({ 
      error: 'Error creating pedido',
      details: error.message
    });
  }
};

export const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE pedidos SET estado = ? WHERE id_pedido = ?',
      [estado, id]
    );
    connection.release();
    res.json({ message: 'Pedido actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating pedido' });
  }
};

export const deletePedido = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    connection.release();
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting pedido' });
  }
};
