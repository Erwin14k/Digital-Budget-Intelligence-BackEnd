const Person = require('../models/person');
const { auth } = require('../config/config');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerPerson = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const password_hash = await bcryptjs.hash(password, 12);
        const args = { username, email, password: password_hash };
        await Person.register(args);
        res.status(200).json({ message: 'Person created!' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

module.exports.loginPerson = async (req, res, next) => {
    const { email, password } = req.body;
    //console.log(email);
    try {
        const args = { email };
        const { rows } = await Person.login(args);
        if (rows.length) {
            const { person, username, password: password_hash, email } = rows[0];
            const password_is_valid = await bcryptjs.compare(password, password_hash);
            if (password_is_valid) {
                const data_person = { person, username, email };
                const token = jwt.sign(data_person, auth.token);
                const data = [data_person];
                return res.status(200).json({ token, data });
            }
        }
        res.status(400).json({ message: 'Error: email or password not valid' });
    } catch (error) {
    res.status(400).json({ message: error });
    }
};

module.exports.infoPerson = async (req, res, next) => {
    const { person, username, email } = req.person;
    res.status(200).json({ data: [{ person, username, email }] });
};