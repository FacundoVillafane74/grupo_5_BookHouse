const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// - /user

// INICIO DE SESIÓN DE LOS USUARIOS

router.get('/login', userController.login);
router.post('/login', userController.loginPost);

// REGISTRO DE LOS USUARIOS

router.get('/register', userController.register);
router.post('/register', userController.registerPost);

module.exports = router;