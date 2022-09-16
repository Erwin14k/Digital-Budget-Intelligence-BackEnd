const guard = require('../sentinel/guard');
const express = require('express');
const router = express.Router();

const {
    createIncome,
    getIncomes,
} = require('../controllers/income');

router.post('/income', guard, createIncome);
router.get('/income', guard, getIncomes);

module.exports = router;