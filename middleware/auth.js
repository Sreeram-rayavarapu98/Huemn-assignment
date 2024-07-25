const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      }
      User.findById(decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(401).send("Unauthorized");
          }
          req.user = user;
          req.organizationId = user.organizationId;
          next();
        })
        .catch((err) => res.status(500).send("Server Error"));
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};
