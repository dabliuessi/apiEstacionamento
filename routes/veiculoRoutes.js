import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { criarVeiculo, listarVeiculos } from '../controllers/veiculoController.js';
const router = Router();

router.post('/', auth, criarVeiculo);
router.get('/', auth, listarVeiculos);

export default router;
