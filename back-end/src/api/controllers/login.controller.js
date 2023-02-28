const userService = require('../services/user.service');
const jwtConfig = require('../auth/jwtConfig');

const login = async (req, res) => {
  const { email, password } = req.body;
  const hasUser = await userService.getEmail(email, password);
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

module.exports = {
  login,
};

// {"hasToken": false, "method": "POST", "status": 200}