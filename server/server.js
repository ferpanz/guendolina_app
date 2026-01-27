import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import stylesRoutes from './routes/styles.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import pedidosRoutes from './routes/pedidos.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir imágenes estáticas
app.use('/images', express.static(path.join(__dirname, '../src/assets')));

app.use('/api/styles', stylesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/pedidos', pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});