//const guard = require('../sentinel/guard');
const express = require("express");
const router = express.Router();

const { createAccount, getAccounts } = require("../controllers/account");

router.post("/account", createAccount);
router.get("/account", getAccounts);

module.exports = router;
