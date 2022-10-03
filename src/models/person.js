const { pool } = require("../utils/db");
const oracledb = require("oracledb");

module.exports.register = ({ username, email, password }) => {
  const bindings = {
    username,
    email,
    password,
    person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  const SQL_INSERT_PERSON = `INSERT INTO PERSON(PERSON, USERNAME, EMAIL, PERSON_TOKEN,PASSWORD)
                            VALUES(SQ_PERSON.NEXTVAL, :username, :email, API_TOKEN(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS') || :password),:password)
                            RETURNING PERSON_TOKEN INTO :person_token`;
  return pool(SQL_INSERT_PERSON, bindings, { autoCommit: true });
};
module.exports.existEmail = ({ email }) => {
  const bindings = { email };
  const SQL_SELECT_CATEGORY = `SELECT 
                                    Person AS "person"
                                    FROM PERSON
                                    WHERE EMAIL = :email`;
  return pool(SQL_SELECT_CATEGORY, bindings);
};
module.exports.hashpassword = ({ email }) => {
  const bindings = { email };
  const SQL_HASH_PASSWORD = `SELECT PASSWORD FROM PERSON WHERE EMAIL = :email`;
  return pool(SQL_HASH_PASSWORD, bindings);
};

module.exports.login = ({ email, password }) => {
  const bindings = {
    email,
    password,
    person_token: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    username: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  const SQL_LOGIN_PERSON = `UPDATE PERSON
                                SET
                                    PERSON_TOKEN = API_TOKEN(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS') || :password)
                                WHERE EMAIL = :email
                                RETURNING PERSON_TOKEN, USERNAME INTO :person_token, :username`;
  return pool(SQL_LOGIN_PERSON, bindings, { autoCommit: true });
  /*const SQL_SELECT_PERSON = `SELECT 
                                PERSON AS "person", 
                                USERNAME AS "username", 
                                EMAIL AS "email", 
                                PASSWORD AS "password"
                            FROM PERSON
                            WHERE EMAIL = :email`;
    return pool(SQL_SELECT_PERSON, bindings);*/
};
