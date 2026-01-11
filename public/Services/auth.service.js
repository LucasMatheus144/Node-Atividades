const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/Login/User');

/**
 * Gera JWT
 */
function signToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

/**
 * Registra usuário
 */
async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw Object.assign(new Error('E-mail já cadastrado.'), { status: 409 });
  }

  if (!password || password.length < 6) {
    throw Object.assign(
      new Error('Senha deve ter no mínimo 6 caracteres.'),
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: 'User'
  });

  const token = signToken(user);

  return { user, token };
}

/**
 * Login do usuário
 */
async function loginUser({ email, password }) {
  const user = await User.scope('withPassword').findOne({ where: { email } });

  if (!user || !user.isActive) {
    throw Object.assign(new Error('Credenciais inválidas.'), { status: 401 });
  }

  const ok = await bcrypt.compare(password || '', user.passwordHash);
  if (!ok) {
    throw Object.assign(new Error('Credenciais inválidas.'), { status: 401 });
  }

  await user.update({ lastLoginAt: new Date() });

  const token = signToken(user);

  // remove hash
  const safeUser = await User.findByPk(user.id);

  return { user: safeUser, token };
}

module.exports = {
  registerUser,
  loginUser
};
