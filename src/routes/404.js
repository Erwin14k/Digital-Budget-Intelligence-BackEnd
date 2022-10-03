const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  //console.log(req);
  res.status(404).json({ message: "Invalid Endpoint" });
});

module.exports = router;
