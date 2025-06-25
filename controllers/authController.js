import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

export const register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const hashed = await bcrypt.hash(senha, 10);
    const user = await Usuario.create({ nome, email, senha: hashed, tipo, ativo: true });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar' });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha)))
      return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Retorna o token e os dados básicos do usuário
    res.json({
      token,
      usuario: {
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
};

