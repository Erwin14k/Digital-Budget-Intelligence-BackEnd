const express = require("express");
const router = express.Router();

const { infoPerson } = require("../controllers/info_person");

router.get("/person_info", infoPerson);

module.exports = router;
