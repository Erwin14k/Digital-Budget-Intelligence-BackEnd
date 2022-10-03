const express = require("express");
const app = express();
const oracle = require("./src/utils/db");
const { server } = require("./src/config/config");
const cors = require("cors");
const cookies = require("cookie-parser");
const guard = require("./src/sentinel/guard");

const routes_person = require("./src/routes/person");
const routes_info = require("./src/routes/info_person");
const routes_expense = require("./src/routes/expense");
const routes_income = require("./src/routes/income");
const routes_account = require("./src/routes/account");
const routes_transference = require("./src/routes/transfer");
const routes_invalid = require("./src/routes/404");

app.use(cors({ origin: true, credentials: true }));
app.use(cookies());
app.use(express.json());
app.use(routes_person);
app.use(guard);
app.use(routes_info);
app.use(routes_expense);
app.use(routes_income);
app.use(routes_account);
app.use(routes_transference);
app.use(routes_invalid);

oracle
  .start()
  .then(() => {
    console.log("Oracle database connected!");
    app.listen(server.port, () => {
      console.log(`Server running on port: ${server.port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
