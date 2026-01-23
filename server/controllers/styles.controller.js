import pool from '../config/db.js';

export const getStyles = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM styles');
    connection.release();
    
    // Agregar URL completa a las imágenes
    const stylesWithImages = rows.map(style => ({
      ...style,
      image: `http://localhost:5000/images/${style.image}`
    }));
    
    res.json(stylesWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching styles' });
  }
};

// CREATE
export const createStyle = async (req, res) => {
  const { 'name-style': name, description, image, status } = req.body;
  
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO styles (`name-style`, description, image, status) VALUES (?, ?, ?, ?)',
      [name.toUpperCase(), description, image, status]
    );
    connection.release();
    res.status(201).json({ message: 'Estilo creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating style' });
  }
};

// UPDATE
export const updateStyle = async (req, res) => {
  const { id } = req.params;
  const { 'name-style': name, description, image, status } = req.body;
  
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE styles SET `name-style` = ?, description = ?, image = ?, status = ? WHERE id = ?',
      [name.toUpperCase(), description, image, status, id]
    );
    connection.release();
    res.json({ message: 'Estilo actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating style' });
  }
};

// DELETE
export const deleteStyle = async (req, res) => {
  const { id } = req.params;
  
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM styles WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Estilo eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting style' });
  }
};