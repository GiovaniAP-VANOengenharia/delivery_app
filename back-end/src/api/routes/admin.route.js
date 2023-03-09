const { Router } = require('express');

const adminRouter = Router();
const admController = require('../controllers/admin.controller');

adminRouter.post('/', admController.createUserAdm);

module.exports = {
  adminRouter,
};
