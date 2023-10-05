const express = require('express');
const productControllerDB = require('../controllers/productControllerDB');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
const { auth, admin } = require('../middlewares/userPermissionMiddleware');

const router = express.Router();

// Destino y nombre de los archivos (multer)

const {storageProducts: storage} = require('../utils/multer');

let upload = multer({storage});

// Validaciones (express-validator)

const {validationFormAdd} = require('../utils/validations');
const {validationFormEdit} = require('../utils/validations');


// - /product

// DETALLE DEL PRODUCTO

router.get('/:id/detail', productControllerDB.detail);

// CARRITO DE COMPRAS

router.get('/cart', productControllerDB.cart);

// AGREGAR PRODUCTOS

router.get('/add', admin, productControllerDB.add);
router.post('/add', [upload.single('image'), validationFormAdd, admin], productControllerDB.create);

// EDITAR PRODUCTOS

router.get('/:id/edit', admin, productControllerDB.edit);
router.put('/:id/edit', [upload.single('image'), validationFormEdit, admin], productControllerDB.update);

// ELIMINAR PRODUCTOS

router.delete('/:id/delete', admin, productControllerDB.destroy);

module.exports = router;