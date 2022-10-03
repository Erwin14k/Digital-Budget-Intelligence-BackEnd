//const guard = require('../sentinel/guard');
const express = require("express");
const router = express.Router();

const {
  registerPerson,
  loginPerson,
  infoPerson,
} = require("../controllers/person");

router.post("/register", registerPerson);
router.post("/login", loginPerson);
//router.post("/person_info", infoPerson);

module.exports = router;
