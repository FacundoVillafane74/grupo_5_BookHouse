const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/detail', productController.detail);

router.get('/cart', productController.cart);

router.get('/add', productController.add);

router.get('/edit', productController.edit);

module.exports = router;