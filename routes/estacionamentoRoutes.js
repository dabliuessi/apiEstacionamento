import { Router } from 'express';
import {
  listarEstacionamentos,
  criarEstacionamento,
} from '../controllers/estacionamentoController.js';
import autenticar  from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', listarEstacionamentos);
router.post('/', autenticar, criarEstacionamento);

export default router;
