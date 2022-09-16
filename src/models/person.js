const { pool } = require('../utils/db');

module.exports.register = ({ username, email, password }) => {
    const bindings = { username, email, password };
    const SQL_INSERT_PERSON = `INSERT INTO PERSON(PERSON, USERNAME, EMAIL, PASSWORD)
                            VALUES(SQ_PERSON.NEXTVAL, :username, :email, :password)`;
    return pool(SQL_INSERT_PERSON, bindings, { autoCommit: true });
};

module.exports.login = ({ email }) => {
    const bindings = { email };
    const SQL_SELECT_PERSON = `SELECT 
                                PERSON AS "person", 
                                USERNAME AS "username", 
                                EMAIL AS "email", 
                                PASSWORD AS "password"
                            FROM PERSON
                            WHERE EMAIL = :email`;
    return pool(SQL_SELECT_PERSON, bindings);
};