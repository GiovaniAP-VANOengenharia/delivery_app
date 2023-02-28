const userService = require('../services/user.service');
const jwtConfig = require('../auth/jwtConfig');

const login = async (req, res) => {
  const { email, password } = req.body;
  const hasUser = await userService.getEmail(email, password);
  console.log(hasUser);
  if (!hasUser) {
    res.status(404).json({ message: 'User not Found' });
  }
  const token = jwtConfig.createToken({ id: hasUser.id, email, role: hasUser.role });

  return res.status(200).json({ token });
};

module.exports = {
  login,
};