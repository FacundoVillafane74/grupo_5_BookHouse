const express = require('express');
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');

const router = express.Router();

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

// - /product

// DETALLE DEL PRODUCTO

router.get('/:id/detail', productController.detail);

// CARRITO DE COMPRAS

router.get('/cart', productController.cart);

// AGREGAR PRODUCTOS

router.get('/add', productController.add);
router.post('/add', upload.single('image'), productController.create);

// EDITAR PRODUCTOS

router.get('/:id/edit', productController.edit);
router.put('/:id/edit', upload.single('image'), productController.update);

// ELIMINAR PRODUCTOS

router.delete('/:id/delete', productController.destroy);

module.exports = router;