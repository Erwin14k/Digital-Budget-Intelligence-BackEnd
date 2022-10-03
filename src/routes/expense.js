//const guard = require('../sentinel/guard');
const express = require("express");
const router = express.Router();

const { createExpense, getExpenses } = require("../controllers/expense");

router.post("/expense", createExpense);
router.get("/expense", getExpenses);

module.exports = router;
