const jwt = require('jsonwebtoken');
const config = require('../config');
const Usermodal = require('../dataModule/signInModal');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decode) => {
      if (err) {
        res.status(401).json({
          error: 'failed to authenticate',
          status: false,
        });
      } else {
        Usermodal.findById(decode.id)
          .then((user) => {
            if (!user) {
              res.status(404).json({
                error: 'No such user',
              });
            }
            req.currentUser = user;
            next();
          });
      }
    });
  } else {
    res.status(403).json({
      error: 'no token provided',
    });
  }
};
