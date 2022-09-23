const Expense = require('../models/expense');
const Account = require('../models/account');

module.exports.createExpense = async (req, res, next) => {
    const args = {
        person: req.person.person,
        category: req.body.category,
        ammount: req.body.ammount,
        account: req.body.account,
    };
    const updateArgs={
        ammount: req.body.ammount,
        account: req.body.account,
    }
    try {
        await Account.updateExpense(updateArgs);
        await Expense.create(args);
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

