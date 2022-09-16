const { pool } = require('../utils/db');

module.exports.create = ({ person, category, ammount, account }) => {
    const bindings = { person, category, ammount,account };
    const SQL_INSERT_INCOME = `INSERT INTO INCOME(INCOME, CATEGORY, AMMOUNT, PERSON, ACCOUNT)
                                VALUES(SQ_INCOME.NEXTVAL, :category, :ammount, :person, :account)`;
    return pool(SQL_INSERT_INCOME, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_INCOMES = `SELECT 
                                    INCOME AS "income", 
                                    CATEGORY AS "category",
                                    AMMOUNT AS "ammount", 
                                    ADD_DATE AS "add_date",
                                    ACCOUNT AS "account"
                                    FROM INCOME
                                    WHERE PERSON = :person`;
    return pool(SQL_SELECT_INCOMES, bindings);
};