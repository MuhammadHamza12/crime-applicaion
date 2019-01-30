const express = require('express');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ms = require('ms');
const userModal = require('../../dataModule/signInModal');
const config = require('../../config');
const Auth = require('../routes/auth-routes');
const loginRoute = express.Router();


function userLoginPostRequest(req, res) {
  console.log(req.body);
  const {
    identifier,
    password,
  } = req.body;
  console.log('here we go: ', password, identifier);
  const searchOBJ = {
    email: identifier,
  };

  userModal.findOne(searchOBJ)
    .then((success) => {
      console.log('response data: ', success);
      if (success !== null) {
        try {
          if (bycrypt.compareSync(password, success.password)) {
            const token = jwt.sign({
              id: success._id,
              email: success.email,
              username: success.username,
              type: success.type,
            }, config.jwtSecret, {
              expiresIn: '1d',
            });
            res.json({
              token,
            });
          } else {
            res.status(401).json({
              errors: {
                form: 'Invalid Credentials',
              },
            });
          }
        } catch (e) {
          res.status(401).json({
            errors: {
              form: 'Invalid Credentials',
            },
          });
        }
      } else {
        res.status(401).json({
          errors: {
            form: 'Invalid Credentials',
          },
        });
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
  // const query = userModal.where(searchOBJ);
  // query.findOne((err, res) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   if (res) {
  //     console.log('database response: ', +res);
  //   }
  // });
}

module.exports = {
  userLoginPostRequest,
};