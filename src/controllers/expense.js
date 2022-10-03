const Expense = require("../models/expense");
const Account = require("../models/account");

module.exports.createExpense = async (req, res, next) => {
  const args = {
    person: req.person.person,
    category: req.body.category,
    ammount: req.body.ammount,
    account: req.body.account,
  };
  const updateArgs = {
    ammount: req.body.ammount,
    account: req.body.account,
  };
  try {
    const { rows } = await Account.findById({
      account: args.account,
      person: args.person,
    });
    if (parseFloat(rows[0].ammount) >= parseFloat(args.ammount)) {
      await Account.updateExpense(updateArgs);
      await Expense.create(args);
      res.status(200).json({ message: "Expense created!" });
    } else {
      res
        .status(409)
        .json({ message: "No Sufficent funds to do the expense!" });
    }
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
