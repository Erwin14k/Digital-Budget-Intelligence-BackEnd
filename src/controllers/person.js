const Person = require("../models/person");
//const { auth } = require("../config/config");
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

module.exports.registerPerson = async (req, res, next) => {
  /*const { username, email, password } = req.body;
  try {
    const password_hash = await bcryptjs.hash(password, 12);
    const args = { username, email, password: password_hash };
    const { rows } = await Person.existEmail({ email: email });
    if (rows.length === 0) {
      await Person.register(args);
      res.status(200).json({ message: "Person created!" });
    } else {
      res.status(409).json({ message: "Email, already used!" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }*/
  const args = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username,
  };
  try {
    const { outBinds } = await Person.register(args);
    const { person_token } = outBinds;
    res
      .status(200)
      .cookie("auth_token", person_token[0], {
        sameSite: "none",
        secure: true,
        expires: new Date(2147483647 * 1000),
      })
      .json({
        messsage: "Person was registered successfully!",
        data: [
          {
            username: req.body.username,
            auth_token: person_token[0],
          },
        ],
      });
  } catch (error) {
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ messsage: error });
  }
};

module.exports.loginPerson = async (req, res, next) => {
  let args = {
    email: req.body.email,
    password: req.body.password,
  };
  //console.log(email, password);
  try {
    const { rows: hashpasswordrow } = await Person.hashpassword(args);
    //console.log(hashpasswordrow);
    if (hashpasswordrow.length > 0) {
      //console.log("hola desde aqui");
      const hashpassword = hashpasswordrow[0]["PASSWORD"];
      //console.log(hashpassword);
      if (bcrypt.compareSync(args.password, hashpassword)) {
        //console.log("mas cerca");
        args = { email: args.email, password: hashpassword };
        const { outBinds } = await Person.login(args);
        const { person_token, username } = outBinds;
        //console.log("aqui si fijo");
        return res
          .status(200)
          .cookie("auth_token", person_token[0], {
            sameSite: "none",
            secure: true,
            expires: new Date(2147483647 * 1000),
          })
          .json({
            messsage: "Login Successfully",
            data: [
              {
                username: username[0],
                auth_token: person_token[0],
              },
            ],
          });
      }
    }
    res
      .status(409)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ messsage: "Email or password not valid" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({ messsage: error });
  }

  /*try {
    const args = { email };
    const { rows } = await Person.login(args);
    if (rows.length) {
      const { person, username, password: password_hash, email } = rows[0];
      const password_is_valid = await bcryptjs.compare(password, password_hash);
      if (password_is_valid) {
        const data_person = { person, username, email };
        const token = jwt.sign(data_person, auth.token);
        const data = [data_person];
        return res.status(200).json({ token, data });
      }
    }
    res.status(409).json({ message: "Error: email or password not valid" });
  } catch (error) {
    res.status(400).json({ message: error });
  }*/
};

/*module.exports.infoPerson = async (req, res, next) => {
  const { person, username, email } = req.person;
  res.status(200).json({ data: [{ person, username, email }] });
};*/

/*module.exports.infoPerson = (req, res, next) => {
  res.status(200).json({
    message: "success",
    data: [
      {
        username: req.person.username,
      },
    ],
  });
};*/
