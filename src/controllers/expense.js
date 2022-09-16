const Category = require('../models/expense');

module.exports.createExpense = async (req, res, next) => {
    const args = {
        person: req.person.person,
        expense: req.body.expense,
        ammount: req.body.ammount,
        account: req.body.account,
    };
    try {
        await Category.create(args);
        res.status(200).json({ message: 'Expense created!' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

module.exports.getExpenses = async (req, res, next) => {
    const args = {
        person: req.person.person,
    };
    try {
        const { rows } = await Expense.fetchAll(args);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

