const express = require('express');
const userController = require('../controllers/user.controller');
const patientController = require('../controllers/patient.controller');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
// user routes
router.post('/user/register', userController.registerLab);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);

// patient routes
router.post('/patient/createReport',verifyToken, patientController.createReport);
router.put('/patient/updateReport/:id',verifyToken, patientController.updateReport);
router.get('/patient/reports',verifyToken, patientController.getReports);

module.exports = router;