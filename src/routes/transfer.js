const guard = require('../sentinel/guard');
const express = require('express');
const router = express.Router();

const {
    createTransfer,
} = require('../controllers/transfer');

router.post('/transfer', guard, createTransfer);


module.exports = router;