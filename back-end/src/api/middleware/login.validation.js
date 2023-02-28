const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const inputEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    return res.status(400).json({
      hasToken: false,
      method: "POST",
      status: 400,
      message: 'O campo "email" é obrigatório'
    });
  }
  if (!inputEmail.test(email)) {
    return res.status(400).json({ 
      hasToken: false,
      method: "POST",
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      hasToken: false,
      method: "POST",
      status: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  validateLogin,
};