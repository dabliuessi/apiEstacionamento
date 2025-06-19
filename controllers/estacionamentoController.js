import { Estacionamento } from '../models/index.js';


export const listarEstacionamentos = async (req, res) => {
  try {
    const dados = await Estacionamento.findAll();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar estacionamentos' });
  }
};


export const criarEstacionamento = async (req, res) => {
  const { localiddade, total_vagas } = req.body;

  if (!nome || !total_vagas) {
    return res.status(400).json({ error: 'Nome e total de vagas são obrigatórios' });
  }

  try {
    const novo = await Estacionamento.create({
      localiddade,
      total_vagas,
      vagas_ocupadas: 0,
    });
    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar estacionamento' });
  }
};
