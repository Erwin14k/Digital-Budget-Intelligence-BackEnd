const oracledb = require('oracledb');
const { oracle } = require('../config/config');

// init database
module.exports.start = async () => {
    await oracledb.createPool(oracle);
};

// close databse
module.exports.close = async () => {
    await oracledb.getPool().close(0);
};


module.exports.pool = async (statement, binds = [], opts = {}) => {
    let conn;
    let result = [];
    opts.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try {
        conn = await oracledb.getConnection();
        result = await conn.execute(statement, binds, opts);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.log(error);
            }
        }
    }
};