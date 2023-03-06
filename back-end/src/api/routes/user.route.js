const { Router } = require('express');
const {
  validateEmail,
  validatePassword,
  validateName,
  validateToken,
} = require('../middleware/login.validation');
const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/sellers', validateToken, userController.getSellers);

userRouter.post('/login', validateEmail, validatePassword, userController.login);
userRouter.post('/register', validateName,
  validateEmail, validatePassword, userController.createUser);

module.exports = {
  userRouter,
};