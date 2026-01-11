const {
  registerUser,
  loginUser
} = require('../Services/auth.service');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser({ name, email, password });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login
};
