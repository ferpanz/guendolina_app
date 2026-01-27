import bcrypt from 'bcryptjs';
import pool from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
  try {
    // Crear contraseña encriptada para "password123"
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('Contraseña encriptada:', hashedPassword);

    const connection = await pool.getConnection();

    // Eliminar usuarios existentes para empezar limpio (opcional)
    // await connection.query('DELETE FROM users');

    // Insertar nuevo admin
    await connection.query(
      'INSERT INTO users (`user-name`, email, password, admin) VALUES (?, ?, ?, ?)',
      ['ADMIN', 'admin@test.com', hashedPassword, 1]
    );

    // Insertar usuario normal
    const hashedPassword2 = await bcrypt.hash('password123', 10);
    await connection.query(
      'INSERT INTO users (`user-name`, email, password, admin) VALUES (?, ?, ?, ?)',
      ['USUARIO NORMAL', 'user@test.com', hashedPassword2, 0]
    );

    console.log('✓ Usuarios creados exitosamente');
    console.log('\nCredenciales de prueba:');
    console.log('Admin:');
    console.log('  Email: admin@test.com');
    console.log('  Contraseña: password123');
    console.log('\nUsuario Normal:');
    console.log('  Email: user@test.com');
    console.log('  Contraseña: password123');

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdminUser();
