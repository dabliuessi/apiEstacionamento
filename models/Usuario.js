import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  senha: DataTypes.STRING,
  tipo: DataTypes.ENUM('professor', 'aluno', 'visitante', 'outro', 'admin'),
  ativo: DataTypes.BOOLEAN,
});


export default Usuario;
