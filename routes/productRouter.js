const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/detail', productController.detail);

module.exports = router;