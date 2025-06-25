import { RegistroAcesso, Estacionamento, Veiculo } from '../models/index.js';;

export const registrarEntrada = async (req, res) => {
  const { id_veiculo, id_estacionamento } = req.body;

  try {
    const estacionamento = await Estacionamento.findByPk(id_estacionamento);
    if (!estacionamento) {
      return res.status(404).json({ error: 'Estacionamento não encontrado' });
    }

    if (estacionamento.vagas_ocupadas >= estacionamento.total_vagas) {
      return res.status(400).json({ error: 'Estacionamento lotado' });
    }

    const registroAtivo = await RegistroAcesso.findOne({
      where: {
        id_veiculo,
        data_hora_saida: null,
      },
    });

    if (registroAtivo) {
      return res.status(400).json({ error: 'Veículo já está registrado no estacionamento' });
    }

    const entrada = await RegistroAcesso.create({
      data_hora_entrada: new Date(),
      id_veiculo,
      id_estacionamento,
    });

    estacionamento.vagas_ocupadas += 1;
    await estacionamento.save();

    res.json(entrada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar entrada' });
  }
};

export const registrarSaida = async (req, res) => {
  const { id } = req.params;

  try {
    const acesso = await RegistroAcesso.findByPk(id);
    if (!acesso) return res.status(404).json({ error: 'Registro não encontrado' });

    if (acesso.data_hora_saida) return res.status(400).json({ error: 'Saída já registrada' });

    acesso.data_hora_saida = new Date();
    await acesso.save();

    
    const estacionamento = await Estacionamento.findOne();
    if (estacionamento && estacionamento.vagas_ocupadas > 0) {
      estacionamento.vagas_ocupadas -= 1;
      await estacionamento.save();
    }

    res.json(acesso);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar saída' });
  }
};

export const listarRegistros = async (req, res) => {
  try {
    const registros = await RegistroAcesso.findAll({
      include: [
        {
          model: Veiculo,
          as: 'veiculo',
          attributes: ['placa', 'modelo', 'id_usuario'],
          where: { id_usuario: req.user.id }  // filtra veículos do usuário logado
        },
        {
          model: Estacionamento,
          as: 'estacionamento',
          attributes: ['localidade']
        }
      ],
      order: [['data_hora_entrada', 'DESC']]
    });

    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar registros' });
  }
};



