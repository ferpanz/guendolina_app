import express from 'express';
import { getAllPedidos, createPedido, updatePedido, deletePedido } from '../controllers/pedidos.controller.js';

const router = express.Router();

router.get('/', getAllPedidos);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

export default router;
