import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database.js';
import Estacionamento from './models/Estacionamento.js';

(async () => {
  try {
    await sequelize.sync();

    // Verifica se o estacionamento já existe
    const existente = await Estacionamento.findOne({
      where: { localidade: 'Estacionamento Central' }
    });

    if (!existente) {
      await Estacionamento.create({
        localidade: 'Estacionamento Central',
        total_vagas: 100,
        vagas_ocupadas: 0
      });
      console.log('Estacionamento criado com sucesso!');
    } else {
      console.log('Estacionamento já existe.');
    }

    await sequelize.close();
  } catch (error) {
    console.error('Erro ao criar estacionamento:', error);
  }
})();
