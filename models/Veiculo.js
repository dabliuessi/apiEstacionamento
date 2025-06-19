import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './Usuario.js';

const Veiculo = sequelize.define('Veiculo', {
  modelo: DataTypes.STRING,
  placa: DataTypes.STRING,
  cor: DataTypes.STRING,
  imagem: DataTypes.STRING,
});


Veiculo.belongsTo(Usuario, { foreignKey: 'id_usuario' });

export default Veiculo;
