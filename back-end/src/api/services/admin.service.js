const md5 = require('md5');
const { User } = require('../database/models');

const checkUserAdm = async ({ name, email }) => {
  const checkName = await User.findOne({
    where: { name },
  });
  const checkEmail = await User.findOne({
    where: { email },
  });

  if (checkName || checkEmail) {
    return { type: 404 };
  }

  return { type: 200 };
};

const createUserAdm = async ({ name, email, token, role }) => {
  const safePassword = md5(token);
  const result = await User.create({
    name,
    email,
    token: safePassword,
    role,
  });
  return { type: 201, result };
};

module.exports = {
  checkUserAdm,
  createUserAdm,
};
