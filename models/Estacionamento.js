import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Estacionamento = sequelize.define('Estacionamento', {
  localidade: DataTypes.STRING,
  total_vagas: DataTypes.INTEGER,
  vagas_ocupadas: DataTypes.INTEGER,
});

export default Estacionamento;
