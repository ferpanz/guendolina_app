import express from 'express';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  res.json({
    filename: req.file.filename,
    message: 'Archivo subido correctamente'
  });
});

export default router;
