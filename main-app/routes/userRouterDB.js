const express = require('express');
const userControllerDB = require('../controllers/userControllerDB');
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

router.get('/login', guest, userControllerDB.login);
router.post('/login', validationFormLogin, userControllerDB.loginPost);

// REGISTRO DE LOS USUARIOS

router.get('/register', guest, userControllerDB.register);
router.post('/register', [upload.single('image'), validationFormRegister], userControllerDB.registerPost);

// VISTA DE LOS USUARIOS

router.get('/profile', auth, userControllerDB.profile);

// CERRADO DE SESIÓN DE LOS USUARIOS

router.get('/logout', auth, userControllerDB.logout);

module.exports = router;