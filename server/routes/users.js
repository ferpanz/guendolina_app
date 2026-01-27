import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, changePassword } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/change-password', changePassword);

export default router;
