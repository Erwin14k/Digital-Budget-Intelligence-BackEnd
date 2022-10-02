const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  server: {
    port: process.env.SERVER_PORT,
  },
  oracle: {
    user: "appuser",
    password: "digitalbudget",
    connectString: process.env.ORACLE_CONNSTR,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
  },
  auth: {
    token: process.env.AUTH_TOKEN,
  },
};
