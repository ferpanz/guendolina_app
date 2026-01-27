import pool from '../config/db.js';

export const getAllUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT idusers, `user-name`, email, admin FROM users');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const createUser = async (req, res) => {
  const { 'user-name': name, email, password, admin } = req.body;

  try {
    const connection = await pool.getConnection();

    // Verificar si el email ya existe
    const [existingUsers] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    await connection.query(
      'INSERT INTO users (`user-name`, email, password, admin) VALUES (?, ?, ?, ?)',
      [name.toUpperCase(), email, password, admin ? 1 : 0]
    );
    connection.release();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { 'user-name': name, email, admin } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE users SET `user-name` = ?, email = ?, admin = ? WHERE idusers = ?',
      [name.toUpperCase(), email, admin ? 1 : 0, id]
    );
    connection.release();
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM users WHERE idusers = ?', [id]);
    connection.release();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE users SET password = ? WHERE idusers = ?',
      [newPassword, id]
    );
    connection.release();

    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error changing password' });
  }
};
