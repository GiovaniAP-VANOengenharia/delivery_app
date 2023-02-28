const md5 = require('md5');
const { User } = require('../../database/models');

const getLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, password: md5(password) } });
  return user;
};

const getUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (user) => {
  await User.create(user);
};

module.exports = {
  getLogin,
  getUser,
  createUser,
};