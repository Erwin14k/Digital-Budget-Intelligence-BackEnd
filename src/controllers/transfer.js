const Expense = require('../models/expense');
const Income = require('../models/income');
const Account = require('../models/account');
//const Transfer = require('../models/transfer');

module.exports.createTransfer = async (req, res, next) => {
    const args = {
        person: req.person.person,
        category: "Transference",
        ammount: req.body.ammount,
        origin: req.body.origin,
        destiny: req.body.destiny,
    };
    try {
        //Verify if the origin account has sufficient funds.
        //console.log(args.origin);
        const { rows } = await Account.findById({account:args.origin, person:args.person});
        if(parseFloat(rows[0].ammount)>= parseFloat(args.ammount)){
            await Account.updateTransferExpense(args);
            await Expense.create({account:args.origin, person:args.person,ammount:args.ammount,category:"Trasnference"});
            await Account.updateTransferIncome(args);
            await Income.create({account:args.destiny, person:args.person,ammount:args.ammount,category:"Trasnference"});
            res.status(200).json({ message: 'Transfer Created!' });
        }else{
            res.status(409).json({ message: "No Sufficent funds to do the transfer!" });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

