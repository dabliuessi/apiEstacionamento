// routes/adminRoutes.js
import express from 'express';
import autenticar from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  listarUsuariosComCarros,
  listarRegistros,
  listarEstacionamentos,
  criarEstacionamento,
  atualizarEstacionamento,
  excluirEstacionamento
} from '../controllers/adminController.js';

const router = express.Router();

router.use(autenticar, isAdmin);

router.get('/usuarios', listarUsuariosComCarros);
router.get('/registros', listarRegistros);
router.get('/estacionamentos', listarEstacionamentos);
router.post('/estacionamentos', criarEstacionamento);
router.put('/estacionamentos/:id', atualizarEstacionamento)
router.delete('/estacionamentos/:id', excluirEstacionamento)

export default router;
