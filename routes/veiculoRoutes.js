import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { criarVeiculo, listarVeiculos, deletarVeiculo } from '../controllers/veiculoController.js';
const router = Router();

router.post('/', auth, criarVeiculo);
router.delete('/:id', auth, deletarVeiculo);
router.get('/', auth, listarVeiculos);

export default router;
