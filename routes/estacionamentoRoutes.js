import { Router } from 'express';
import {
  listarEstacionamentos,
  criarEstacionamento,
} from '../controllers/estacionamentoController.js';
import autenticar  from '../middleware/authMiddleware.js';

const router = Router();

// Lista pública
router.get('/', listarEstacionamentos);

// Criar estacionamento (protegido por token)
router.post('/', autenticar, criarEstacionamento);

export default router;
