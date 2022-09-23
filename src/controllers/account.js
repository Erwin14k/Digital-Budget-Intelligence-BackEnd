const Account = require('../models/account');

module.exports.createAccount = async (req, res, next) => {
    const args = {
        person: req.person.person,
        currency: req.body.currency,
        ammount: req.body.ammount,
    };
    try {
        await Account.create(args);
        res.status(200).json({ message: 'Account created!' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

module.exports.getAccounts = async (req, res, next) => {
    const args = {
        person: req.person.person,
    };
    try {
        const { rows } = await Account.fetchAll(args);
        //console.log(rows);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

