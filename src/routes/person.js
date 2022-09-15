const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    registerPerson,
    loginPerson,
    infoPerson,
} = require('../controllers/person');

router.post('/register', registerPerson);
router.post('/login', loginPerson);
router.get('/person', guard, infoPerson);

module.exports = router;