const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Destino y nombre de los archivos (multer)

const {storageUsers: storage} = require('../utils/multer');

let upload = multer({storage});

// Validaciones (express-validator)

const {validationFormRegister} = require('../utils/validations');
const {validationFormLogin} = require('../utils/validations');

// - /user

// INICIO DE SESIÓN DE LOS USUARIOS

router.get('/login', userController.login);
router.post('/login', validationFormLogin, userController.loginPost);

// REGISTRO DE LOS USUARIOS

router.get('/register', userController.register);
router.post('/register', [upload.single('image'), validationFormRegister], userController.registerPost);

// CERRADO DE SESIÓN DE LOS USUARIOS

router.get('/logout', userController.logout);

module.exports = router;