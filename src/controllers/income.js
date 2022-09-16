const Category = require('../models/income');

module.exports.createIncome = async (req, res, next) => {
    const args = {
        person: req.person.person,
        income: req.body.income,
        ammount: req.body.ammount,
        account: req.body.account,
    };
    try {
        await Category.create(args);
        res.status(200).json({ message: 'Income created!' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

module.exports.getIncomes = async (req, res, next) => {
    const args = {
        person: req.person.person,
    };
    try {
        const { rows } = await Income.fetchAll(args);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};