const express = require('express');
const mainController = require('../controllers/mainController')

const router = express.Router();

// - /

// CARRUSELES CON PRODUCTOS Y LISTADO DE PRODUCTOS

router.get('/', mainController.home);

module.exports = router;