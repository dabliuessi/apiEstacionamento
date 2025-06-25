import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  registrarEntrada,
  registrarSaida,
  listarRegistros
} from '../controllers/registroAcessoController.js';

const router = Router();

router.post('/entrada', auth, registrarEntrada);
router.put('/saida/:id', auth, registrarSaida);
router.get('/', auth, listarRegistros);

export default router;
