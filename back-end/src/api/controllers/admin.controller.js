const adminService = require('../services/adm.service');

const createUserAdm = async (req, res) => {
  const { name, email, token, role } = req.body;
  const checkUser = await adminService.checkUserAdm({ name, email });
  if (checkUser.type === 404) {
    return res.status(409).json({ message: 'Name or email already exist' });
  } if (checkUser.type === 200) {
    const { type, result } = await adminService.createUserAdm({ name, email, token, role });
    return res.status(type).json(result);
  }
};

module.exports = { createUserAdm };
