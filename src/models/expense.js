const { pool } = require('../utils/db');

module.exports.create = ({ person, category, ammount, account }) => {
    const convertedAmmount=parseFloat(ammount);
    //console.log(person+"  "+category+" "+ammount+" "+account);
    const bindings = { person, category, convertedAmmount,account };
    const SQL_INSERT_EXPENSE = `INSERT INTO EXPENSE(EXPENSE, CATEGORY, AMMOUNT, PERSON, ACCOUNT)
                                VALUES(SQ_EXPENSE.NEXTVAL, :category, :convertedAmmount, :person, :account)`;
    return pool(SQL_INSERT_EXPENSE, bindings, { autoCommit: true });
};



module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_EXPENSES = `SELECT 
                                    EXPENSE AS "expense", 
                                    CATEGORY AS "category",
                                    AMMOUNT AS "ammount", 
                                    TO_CHAR(ADD_DATE,'DD/MM/YYYY HH:MI:SS') AS "add_date",
                                    ACCOUNT AS "account"
                                    FROM EXPENSE
                                    WHERE PERSON = :person`;
    //console.log(SQL_SELECT_EXPENSES);
    return pool(SQL_SELECT_EXPENSES, bindings);
};