const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/detail', productController.detail);

router.get('/cart', productController.cart);

module.exports = router;