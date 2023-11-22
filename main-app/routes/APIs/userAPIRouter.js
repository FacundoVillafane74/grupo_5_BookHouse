const express = require('express');
const userAPIController = require('../../controllers/APIs/userAPIController');

const router = express.Router();

// - /user

router.get('/', userAPIController.list);

// DETALLE DEL USER

router.get('/:id/detail', userAPIController.detail);

module.exports = router;