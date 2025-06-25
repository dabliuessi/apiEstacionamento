import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Veiculo from './Veiculo.js';

import Estacionamento from './Estacionamento.js';


const RegistroAcesso = sequelize.define('RegistroAcesso', {
  data_hora_entrada: DataTypes.DATE,
  data_hora_saida: DataTypes.DATE,
});


RegistroAcesso.belongsTo(Veiculo, { foreignKey: 'id_veiculo' });


RegistroAcesso.belongsTo(Veiculo, { foreignKey: 'id_veiculo' });
RegistroAcesso.belongsTo(Estacionamento, { foreignKey: 'id_estacionamento' });

export default RegistroAcesso;
