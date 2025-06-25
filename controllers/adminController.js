// controllers/adminController.js
import { Usuario, Veiculo, RegistroAcesso, Estacionamento } from '../models/index.js';

export const listarUsuariosComCarros = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Veiculo }]
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const listarRegistros = async (req, res) => {
  try {
    const registros = await RegistroAcesso.findAll({
      include: [
        { model: Veiculo, as: 'veiculo' },
        { model: Estacionamento, as: 'estacionamento' }
      ]
    });
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar registros' });
  }
};

export const listarEstacionamentos = async (req, res) => {
  try {
    const estacionamentos = await Estacionamento.findAll();
    res.json(estacionamentos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar estacionamentos' });
  }
};

export const criarEstacionamento = async (req, res) => {
  const { localidade, total_vagas } = req.body;

  if (!localidade || !total_vagas) {
    return res.status(400).json({ error: 'Localidade e total de vagas são obrigatórios' });
  }

  try {
    const novo = await Estacionamento.create({
      localidade,
      total_vagas,
      vagas_ocupadas: 0
    });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar estacionamento' });
  }
};
export const atualizarEstacionamento = async (req, res) => {
  const { id } = req.params;
  const { localidade, total_vagas } = req.body;

  try {
    const estacionamento = await Estacionamento.findByPk(id);
    if (!estacionamento) {
      return res.status(404).json({ error: 'Estacionamento não encontrado' });
    }

    estacionamento.localidade = localidade || estacionamento.localidade;
    estacionamento.total_vagas = total_vagas || estacionamento.total_vagas;

    await estacionamento.save();
    res.json(estacionamento);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar estacionamento' });
  }
};
export const excluirEstacionamento = async (req, res) => {
  const { id } = req.params;

  try {
    const estacionamento = await Estacionamento.findByPk(id);
    if (!estacionamento) {
      return res.status(404).json({ error: 'Estacionamento não encontrado' });
    }

    await estacionamento.destroy();
    res.json({ message: 'Estacionamento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir estacionamento' });
  }
};
