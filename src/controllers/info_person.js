module.exports.infoPerson = (req, res, next) => {
  return res.status(200).json({
    message: "success",
    data: [
      {
        username: req.person.username,
      },
    ],
  });
};
