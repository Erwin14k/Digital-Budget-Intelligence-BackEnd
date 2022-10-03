const Guard = require("../models/guard");

/*module.exports = async (req, res, next) => {
    const header_authorization = req.get('Authorization');
    if (header_authorization) {
        const token = header_authorization.split(' ')[1];
        try {
            const decoded_token = jwt.verify(token, auth.token);
            if (decoded_token) {
                const args = { person: decoded_token.person };
                const {
                rows: [person], 
                } = await Guard.person(args);
                if (person) {
                    req.person = { ...person };
                    return next();
                }
            }
        } catch (error) {
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }
    }
    return res.status(403).json({
        message: 'Unauthorized',
    });
};*/

const guard = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const person_token = req.headers.authorization.split("Bearer ")[1];
  try {
    const args = { person_token };
    const { rows } = await Guard.verifyPersonToken(args);
    if (rows.length > 0) {
      req.person = rows[0];
      return next();
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(403).json({
    message: "Unauthorized",
  });
};

module.exports = guard;
