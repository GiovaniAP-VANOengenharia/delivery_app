const { Router } = require('express');
const { validateEmail, validatePassword } = require('../middleware/login.validation');
const userController = require('../controllers/login.controller');

const userRouter = Router();

userRouter.post('/', validateEmail, validatePassword, userController.login);

module.exports = {
  userRouter,
};