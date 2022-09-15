const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    createExpense,
    getExpenses,
} = require('../controllers/expense');

router.post('/expense', guard, createExpense);
router.get('/expense', guard, getExpenses);

module.exports = router;