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
const {validationFormEditUser} = require('../utils/validations');

// - /user

// INICIO DE SESIÓN DE LOS USUARIOS

router.get('/login', guest, userControllerDB.login);
router.post('/login', validationFormLogin, userControllerDB.loginPost);

// REGISTRO DE LOS USUARIOS

router.get('/register', guest, userControllerDB.register);
router.post('/register', [upload.single('image'), validationFormRegister], userControllerDB.registerPost);

// VISTA DE LOS USUARIOS

router.get('/:id/profile', auth, userControllerDB.profile);

// VISTA DE LAS ORDERS

router.get('/orders', auth, userControllerDB.orders);

// VISTA DE EDICIÓN DE USUARIOS

router.get('/:id/edit', auth, userControllerDB.editUser);
router.put('/:id/edit', [upload.single('image'), auth, validationFormEditUser], userControllerDB.editUpdate);

// CERRADO DE SESIÓN DE LOS USUARIOS

router.get('/logout', auth, userControllerDB.logout);

module.exports = router;