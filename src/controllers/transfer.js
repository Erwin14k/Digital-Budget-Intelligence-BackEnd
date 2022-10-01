const Expense = require('../models/expense');
const Income = require('../models/income');
const Account = require('../models/account');
//const Transfer = require('../models/transfer');

module.exports.createTransfer = async (req, res, next) => {
    const args = {
        person: req.person.person,
        category: "Transference",
        originalAmmount:req.body.ammount,
        ammount: req.body.ammount,
        origin: req.body.origin,
        destiny: req.body.destiny,
        currency:"",
    };
    try {
        //Verify if the origin account has sufficient funds.
        //console.log(args.origin);
        const { rows } = await Account.findById({account:args.origin, person:args.person});
        args.currency=rows[0].currency;
        if(parseFloat(rows[0].ammount)>= parseFloat(args.ammount)){     
            const { rows } = await Account.findById({account:args.destiny, person:args.person});
            if (rows[0].currency=="Dollars"){
                if(args.currency=="Euros"){
                    args.ammount=parseFloat(args.ammount)*0.9802;
                }else if(args.currency=="Quetzals"){
                    args.ammount=parseFloat(args.ammount)*0.1270;
                }
            }else if(rows[0].currency=="Euros"){
                if(args.currency=="Quetzals"){
                    args.ammount=parseFloat(args.ammount)*0.1295;
                }else if(args.currency=="Dollars"){
                    args.ammount=parseFloat(args.ammount)*1.0199;
                }
            }else{
                if(args.currency=="Euros"){
                    args.ammount=parseFloat(args.ammount)*7.7247;
                }else if(args.currency=="Dollars"){
                    args.ammount=parseFloat(args.ammount)*7.8808;
                }
            }
            await Account.updateTransferExpense(args);
            await Expense.create({account:args.origin, person:args.person,ammount:args.originalAmmount,category:"Trasnference"});
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

