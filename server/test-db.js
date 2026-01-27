import pool from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('=== VARIABLES DE ENTORNO ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NO CONFIGURADA');
console.log('DB_NAME:', process.env.DB_NAME);

async function testConnection() {
  try {
    console.log('\n=== PROBANDO CONEXIÓN ===');
    const connection = await pool.getConnection();
    console.log('✓ Conexión exitosa a MySQL');

    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n=== TABLAS EN LA BD ===');
    console.log(tables);

    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    console.log('\n=== USUARIOS EN LA BD ===');
    console.log(`Total de usuarios: ${users[0].count}`);

    const [allUsers] = await connection.query('SELECT idusers, `user-name`, email, admin FROM users');
    console.log('Usuarios encontrados:');
    console.log(allUsers);

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ ERROR:', error.message);
    process.exit(1);
  }
}

testConnection();
