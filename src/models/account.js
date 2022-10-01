const { pool } = require('../utils/db');

module.exports.create = ({ person, currency, ammount }) => {
    const convertedPerson=parseInt(person);
    const convertedAmmount=parseFloat(ammount);
    var currencyAccount="";
    //console.log("hola");
    if (currency==="1"){
        currencyAccount="Dollars";
    }else if(currency==="2"){
        currencyAccount="Euros";
    }else if(currency==="3"){
        currencyAccount="Quetzals";
    }
    const bindings = { convertedPerson, currencyAccount, convertedAmmount };
    const SQL_INSERT_ACCOUNT = `INSERT INTO ACCOUNT(ACCOUNT, CURRENCY, AMMOUNT, PERSON)
                                VALUES(SQ_ACCOUNT.NEXTVAL, :currencyAccount, :convertedAmmount, :convertedPerson)`;
    //console.log("llega hasta aquí");
    return pool(SQL_INSERT_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const personConverted=parseInt(person);
    const bindings = { personConverted };
    const SQL_SELECT_ACCOUNTS = `SELECT 
                                    ACCOUNT AS "account", 
                                    CURRENCY AS "currency",
                                    AMMOUNT AS "ammount", 
                                    ADD_DATE AS "add_date"
                                    FROM ACCOUNT
                                    WHERE PERSON = :personConverted`;
    //console.log(pool(SQL_SELECT_ACCOUNTS, bindings));
    return pool(SQL_SELECT_ACCOUNTS, bindings);
};

module.exports.updateExpense = ({ ammount, account }) => {
    const convertedAccount=parseInt(account);
    const convertedAmmount=parseFloat(ammount);
    //Update Account Ammount
    const bindings = {convertedAmmount,convertedAccount};
    const SQL_UPDATE_ACCOUNT = `UPDATE ACCOUNT
                                SET AMMOUNT=AMMOUNT-:convertedAmmount WHERE ACCOUNT=:convertedAccount`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.updateTransferExpense = ({ originalAmmount, origin }) => {
    const convertedAmmount=parseFloat(originalAmmount);
    const convertedAccount=parseInt(origin);
    //Update Account Ammount
    const bindings = {convertedAmmount,convertedAccount};
    const SQL_UPDATE_ACCOUNT = `UPDATE ACCOUNT
                                SET AMMOUNT=AMMOUNT-:convertedAmmount WHERE ACCOUNT=:convertedAccount`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.updateTransferIncome = ({ ammount, destiny }) => {
    const convertedAmmount=parseFloat(ammount);
    const convertedAccount=parseInt(destiny);
    //Update Account Ammount
    const bindings = {convertedAmmount,convertedAccount};
    const SQL_UPDATE_ACCOUNT = `UPDATE ACCOUNT
                                SET AMMOUNT=AMMOUNT+:convertedAmmount WHERE ACCOUNT=:convertedAccount`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
};
module.exports.updateIncome = ({ ammount, account }) => {
    const convertedAmmount=parseFloat(ammount);
    //Update Account Ammount
    const bindings = {convertedAmmount,account};
    const SQL_UPDATE_ACCOUNT = `UPDATE ACCOUNT
                                SET AMMOUNT=AMMOUNT+:convertedAmmount WHERE ACCOUNT=:account`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
};


module.exports.findById = ({ person, account }) => {
    const personConverted=parseInt(person);
    const accountConverted=parseInt(account);
    const bindings = { personConverted, accountConverted };
    const SQL_SELECT_CATEGORY = `SELECT 
                                    ACCOUNT AS "account", 
                                    CURRENCY AS "currency",
                                    AMMOUNT AS "ammount", 
                                    ADD_DATE AS "add_date"
                                    FROM ACCOUNT
                                    WHERE PERSON = :personConverted
                                    AND ACCOUNT = :accountConverted`;
    return pool(SQL_SELECT_CATEGORY, bindings);
};