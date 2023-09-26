const express = require('express');
const productController = require('../controllers/productController');
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

router.get('/:id/detail', productController.detail);

// CARRITO DE COMPRAS

router.get('/cart', productController.cart);

// AGREGAR PRODUCTOS

router.get('/add', admin, productController.add);
router.post('/add', [upload.single('image'), validationFormAdd, admin], productController.create);

// EDITAR PRODUCTOS

router.get('/:id/edit', admin, productController.edit);
router.put('/:id/edit', [upload.single('image'), validationFormEdit, admin], productController.update);

// ELIMINAR PRODUCTOS

router.delete('/:id/delete', admin, productController.destroy);

module.exports = router;