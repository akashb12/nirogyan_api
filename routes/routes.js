const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();
// user routes
router.post('/user/register', userController.registerLab);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);

module.exports = router;