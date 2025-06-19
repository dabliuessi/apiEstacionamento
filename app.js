import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';
import estacionamentoRoutes from './routes/estacionamentoRoutes.js';
import registroAcessoRoutes from './routes/registroAcessoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/estacionamentos', estacionamentoRoutes);
app.use('/acessos', registroAcessoRoutes);

sequelize.sync({ force: true }).then(() => console.log('Banco recriado com sucesso'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
