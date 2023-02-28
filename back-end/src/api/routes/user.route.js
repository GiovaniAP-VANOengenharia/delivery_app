const { Router } = require('express');
const { validateLogin } = require('../middleware/login.validation');
const userController = require('../controllers/login.controller');

const userRouter = Router();

userRouter.post('/', validateLogin, userController.login);

module.exports = {
  userRouter,
};