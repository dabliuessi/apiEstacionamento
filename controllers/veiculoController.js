import { Veiculo } from '../models/index.js';

export const criarVeiculo = async (req, res) => {
  const { modelo, placa, cor, imagem } = req.body;
  try {
    const veiculo = await Veiculo.create({
      modelo,
      placa,
      cor,
      imagem,
      id_usuario: req.user.id
    });
    res.json(veiculo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar veículo' });
  }
};


export const listarVeiculos = async (req, res) => {
  const veiculos = await Veiculo.findAll({ where: { id_usuario: req.user.id } });
  res.json(veiculos);
};
export const deletarVeiculo = async (req, res) => {
  const { id } = req.params;
  try {
    const veiculo = await Veiculo.findByPk(id);
    if (!veiculo || veiculo.id_usuario !== req.user.id) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    await veiculo.destroy();
    res.json({ message: 'Veículo deletado com sucesso' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Erro ao deletar veículo' });
  }
};
 