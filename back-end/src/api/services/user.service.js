const md5 = require('md5');
const { User } = require('../../database/models');

const getEmail = async (email, password) => {
  const user = await User.findOne({ where: { email, password: md5(password) } });
  return user;
};

module.exports = {
  getEmail,
};