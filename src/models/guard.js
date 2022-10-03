const { pool } = require("../utils/db");

module.exports.verifyPersonToken = ({ person_token }) => {
  const bindings = { person_token };
  const SQL_SELECT_PERSON = `SELECT 
                                PERSON AS "person", 
                                USERNAME AS "username", 
                                EMAIL AS "email"
                                FROM PERSON
                                WHERE PERSON_TOKEN = :person_token`;
  return pool(SQL_SELECT_PERSON, bindings);
};
