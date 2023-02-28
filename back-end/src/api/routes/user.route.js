const { Router } = require('express');
<<<<<<< HEAD
const { validateEmail, validatePassword } = require('../middleware/login.validation');
const userController = require('../controllers/login.controller');

const userRouter = Router();

userRouter.post('/', validateEmail, validatePassword, userController.login);
=======
const { validateLogin } = require('../middleware/login.validation');
const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/login', validateLogin, userController.login);
userRouter.post('/register', validateLogin, userController.createUser);
>>>>>>> 840791f1862e9ef9d1973813c718f825c5256762

module.exports = {
  userRouter,
};