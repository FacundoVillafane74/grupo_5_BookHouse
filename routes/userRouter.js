const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Destino y nombre de los archivos (multer)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let pathArchives = path.join(__dirname, '../public/images');
        callback(null, pathArchives);
    },
    filename: (req, file, callback) => {
        let nameOfFile = 'img-' + Date.now() + path.extname(file.originalname);
        callback(null, nameOfFile);
    }
});

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

module.exports = router;