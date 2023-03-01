const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 12) {
    return res.status(400).json({ 
      hasToken: false,
      method: 'POST',
      status: 400,
      message: 'O "name" deve ter pelo menos 12 caracteres' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const inputEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    return res.status(400).json({
      hasToken: false,
      method: 'POST',
      status: 400,
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!inputEmail.test(email)) {
    return res.status(400).json({ 
      hasToken: false,
      method: 'POST',
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ 
      hasToken: false,
      method: 'POST',
      status: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};