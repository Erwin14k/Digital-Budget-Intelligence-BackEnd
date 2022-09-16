const { pool } = require('../utils/db');

module.exports.create = ({ person, currency, ammount, account }) => {
    const bindings = { person, currency, ammount,account };
    const SQL_INSERT_ACCOUNT = `INSERT INTO ACCOUNT(ACCOUNT, CURRENCY, AMMOUNT, PERSON)
                                VALUES(SQ_ACCOUNT.NEXTVAL, :currency, :ammount, :person)`;
    return pool(SQL_INSERT_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_ACCOUNTS = `SELECT 
                                    ACCOUNT AS "account", 
                                    CURRENCY AS "currency",
                                    AMMOUNT AS "ammount", 
                                    ADD_DATE AS "add_date"
                                    FROM ACCOUNT
                                    WHERE PERSON = :person`;
    return pool(SQL_SELECT_ACCOUNTS, bindings);
};