const { pool } = require('../utils/db');

module.exports.create = ({ person, category, ammount, account }) => {
    const bindings = { person, category, ammount,account };
    const SQL_INSERT_EXPENSE = `INSERT INTO EXPENSE(EXPENSE, CATEGORY, AMMOUNT, PERSON, ACCOUNT)
                                VALUES(SQ_EXPENSE.NEXTVAL, :category, :ammount, :person, :account)`;
    return pool(SQL_INSERT_EXPENSE, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_EXPENSES = `SELECT 
                                    EXPENSE AS "expense", 
                                    CATEGORY AS "category",
                                    AMMOUNT AS "ammount", 
                                    ADD_DATE AS "add_date",
                                    ACCOUNT AS "account"
                                    FROM EXPENSE
                                    WHERE PERSON = :person`;
    return pool(SQL_SELECT_EXPENSES, bindings);
};