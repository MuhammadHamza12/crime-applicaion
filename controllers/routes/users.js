const express = require('express');
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const SignInModel = require('../../dataModule/signInModal');
const userRouter = express.Router();

function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (Validator.isEmpty(data.pasconfirm)) {
    errors.pasconfirm = 'Confirmation required';
  }
  if (!Validator.equals(data.password, data.pasconfirm)) {
    errors.pasconfirm = 'Password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function signTokenMaker(req, res) {
  console.log(req.body);
  const {
    username,
    email,
    id,
  } = req.body;
  console.log('verify coming data : ', username, email, id);
  const token = jwt.sign({
    username,
    email,
    id,
  }, config.jwtSecret, {
    expiresIn: '20s',
  });
  res.json({
    token,
  });
}

function userPostRouter(req, res) {

  console.log(req.body.bodyData);
  console.log('username', req.body.bodyData.username);

  const {
    errors,
    isValid,
  } = validateInput(req.body.bodyData); // this function will returns two things error and isValid

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    // res.send(200).json(req.body.bodyData);
    const {
      username,
      password,
      email,
    } = req.body.bodyData;
    const passwordEncrypt = bcrypt.hashSync(password, 10);
    const dataOBJ = {
      username,
      password: passwordEncrypt,
      email,
    };
    const signInUser = new SignInModel(dataOBJ);
    signInUser
      .save()
      .then((success) => {
        console.log('success object:', success);
        res.send({
          status: true,
          data: success,
        });
      })
      .catch((err) => {
        console.log('err occur: ', err);
        res.send({
          status: false,
          data: err,
        });
      });
  }
}


module.exports = {
  userPostRouter,
  signTokenMaker,
};