const express = require('express');
const mainControllerDB = require('../controllers/mainControllerDB')

const router = express.Router();

// - /

// CARRUSELES CON PRODUCTOS Y LISTADO DE PRODUCTOS

router.get('/', mainControllerDB.home);

// PRODUCTOS BUSCADOS

router.get('/search', mainControllerDB.search);

module.exports = router;