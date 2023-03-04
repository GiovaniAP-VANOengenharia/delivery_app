const md5 = require('md5');
const userService = require('../services/user.service');
const jwtConfig = require('../auth/jwtConfig');

const login = async (req, res) => {
  const { email, password } = req.body;
  const hasUser = await userService.getLogin(email, password);
  if (!hasUser) {
    return res.status(404).json({
      hasToken: false,
      method: 'POST',
      status: 404,
      message: 'Usuário não encontrado',
    });
  }
  const token = jwtConfig.createToken({ id: hasUser.id, email, role: hasUser.role });

  return res.status(200).json({
    hasToken: true,
    method: 'POST',
    status: 200,
    message: token,
    result: { name: hasUser.name, email: hasUser.email, role: hasUser.role, token },
  });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const emailExists = await userService.getUser(email);

  if (emailExists) {
    return res.status(409).json({
      hasToken: false,
      method: 'POST',
      status: 409,
      message: 'User already registered',
    });
  }

  const newUser = await userService
  .createUser({ name, email, password: md5(password), role: role || 'customer' });

  const token = jwtConfig.createToken({ id: newUser.id, email, role: role || 'customer' });

  return res.status(201).json({ hasToken: true, method: 'POST', status: 201, message: token });
};

const getSellers = async (_req, res) => {
  const sellers = await userService.getSellers('seller');

  return res.status(200).json(sellers);
}

module.exports = {
  login,
  createUser,
  getSellers,
};