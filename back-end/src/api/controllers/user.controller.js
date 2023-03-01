const md5 = require('md5');
const userService = require('../services/user.service');
const jwtConfig = require('../auth/jwtConfig');

const login = async (req, res) => {
  const { email, password } = req.body;
  const hasUser = await userService.getLogin(email, password);
  console.log(hasUser);
  if (!hasUser) {
    res.status(404).json({
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

  await userService.createUser({ name, email, password: md5(password), role });

  const newUser = await userService.getUser(email);

  const token = jwtConfig.createToken({ id: newUser.id, email, role });

  return res.status(201).json({ hasToken: true, method: 'POST', status: 201, message: token });
};

module.exports = {
  login,
  createUser,
};