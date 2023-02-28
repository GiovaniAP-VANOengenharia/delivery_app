const md5 = require('md5');
const userService = require('../services/user.service');
const jwtConfig = require('../auth/jwtConfig');

const login = async (req, res) => {
  const { email, password } = req.body;
  const hasUser = await userService.getLogin(email, password);
  console.log(hasUser);
  if (!hasUser) {
    res.status(404).json({ message: 'User not Found' });
  }
  const token = jwtConfig.createToken({ id: hasUser.id, email, role: hasUser.role });

  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const emailExists = await userService.getUser(email);

  if (emailExists) return res.status(409).json({ message: 'User already registered' });

  await userService.createUser({ name, email, password: md5(password), role });

  const newUser = await userService.getUser(email);

  const token = jwtConfig.createToken({ id: newUser.id, email, role });

  return res.status(201).json({ token });
};

module.exports = {
  login,
  createUser,
};