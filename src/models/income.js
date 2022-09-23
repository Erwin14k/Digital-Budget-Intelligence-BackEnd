const { pool } = require('../utils/db');

module.exports.create = ({ person, category, ammount, account }) => {
    const convertedAmmount=parseFloat(ammount);
    const bindings = { person, category, convertedAmmount,account };
    const SQL_INSERT_INCOME = `INSERT INTO INCOME(INCOME, CATEGORY, AMMOUNT, PERSON, ACCOUNT)
                                VALUES(SQ_INCOME.NEXTVAL, :category, :convertedAmmount, :person, :account)`;
    return pool(SQL_INSERT_INCOME, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_INCOMES = `SELECT 
                                    INCOME AS "income", 
                                    CATEGORY AS "category",
                                    AMMOUNT AS "ammount", 
                                    TO_CHAR(ADD_DATE,'DD/MM/YYYY HH:MI:SS') AS "add_date",
                                    ACCOUNT AS "account"
                                    FROM INCOME
                                    WHERE PERSON = :person`;
    return pool(SQL_SELECT_INCOMES, bindings);
};