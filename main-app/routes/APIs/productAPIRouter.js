const express = require('express');
const productAPIController = require('../../controllers/APIs/productAPIController');

const router = express.Router();

// - /product

router.get('/', productAPIController.list);

// DETALLE DEL PRODUCTO

router.get('/:id/detail', productAPIController.detail);

module.exports = router;