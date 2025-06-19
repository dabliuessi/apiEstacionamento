import Usuario from './Usuario.js';
import Veiculo from './Veiculo.js';
import Estacionamento from './Estacionamento.js';
import RegistroAcesso from './RegistroAcesso.js';

// Usuário <-> Veículo
Veiculo.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(Veiculo, { foreignKey: 'id_usuario' });

// Registro <-> Veículo
RegistroAcesso.belongsTo(Veiculo, { foreignKey: 'id_veiculo', as: 'veiculo' });
Veiculo.hasMany(RegistroAcesso, { foreignKey: 'id_veiculo' });

// Registro <-> Estacionamento
RegistroAcesso.belongsTo(Estacionamento, { foreignKey: 'id_estacionamento', as: 'estacionamento' });
Estacionamento.hasMany(RegistroAcesso, { foreignKey: 'id_estacionamento' });

export { Usuario, Veiculo, Estacionamento, RegistroAcesso };
