// middlewares/isAdmin.js
export default function isAdmin(req, res, next) {
  if (req.user?.tipo === 'admin') {
    return next();
  }
  return res.status(403).json({ mensagem: 'Acesso restrito a administradores.' });
}
