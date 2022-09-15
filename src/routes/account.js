const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    createAccount,
    getAccounts,
} = require('../controllers/account');

router.post('/account', guard, createAccount);
router.get('/account', guard, getAccounts);

module.exports = router;