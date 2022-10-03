//const guard = require('../sentinel/guard');
const express = require("express");
const router = express.Router();

const { createIncome, getIncomes } = require("../controllers/income");

router.post("/income", createIncome);
router.get("/income", getIncomes);

module.exports = router;
