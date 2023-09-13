const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { auth, guest } = require('../middlewares/userPermissionMiddleware');

const router = express.Router();

// Destino y nombre de los archivos (multer)

const {storageUsers: storage} = require('../utils/multer');

let upload = multer({storage});

// Validaciones (express-validator)

const {validationFormRegister} = require('../utils/validations');
const {validationFormLogin} = require('../utils/validations');

// - /user

// INICIO DE SESIÓN DE LOS USUARIOS

router.get('/login', guest, userController.login);
router.post('/login', [validationFormLogin, guest], userController.loginPost);

// REGISTRO DE LOS USUARIOS

router.get('/register', guest, userController.register);
router.post('/register', [upload.single('image'), validationFormRegister, guest], userController.registerPost);

// VISTA DE LOS USUARIOS

router.get('/profile', auth, userController.profile);

// CERRADO DE SESIÓN DE LOS USUARIOS

router.get('/logout', auth, userController.logout);

module.exports = router;