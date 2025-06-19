import { Veiculo } from '../models/index.js';

export const criarVeiculo = async (req, res) => {
  const { modelo, placa, cor } = req.body;
  try {
    const veiculo = await Veiculo.create({ modelo, placa, cor, id_usuario: req.user.id });
    res.json(veiculo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar veículo' });
  }
};

export const listarVeiculos = async (req, res) => {
  const veiculos = await Veiculo.findAll({ where: { id_usuario: req.user.id } });
  res.json(veiculos);
};
