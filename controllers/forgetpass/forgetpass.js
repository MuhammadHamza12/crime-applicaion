const express = require('express');
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const SignInModel = require('../../dataModule/signInModal');
const userRouter = express.Router();

function checkResetToken(req, res) {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);
  res.status(200).json({
    status: true,
    message: 'token zinda hai',
  });
}

function saveUpdateUserObject(req, res) {
  console.log(req.body);
  const {
    token,
    stateData,
  } = req.body;
  const {
    cpassword,
    password,
  } = stateData;
  console.log('real token: ', token);
  console.log('stateData: ', stateData);
  try {
    const decode = jwt.verify(token, config.jwtSecret);
    console.log(decode);
    const decodeId = {
      _id: decode.id,
    };
    const passwordEncrypt = bcrypt.hashSync(password, 10);
    console.log('decode id:', decodeId);
    SignInModel.findOne(decodeId)
      .then((successOBJ) => {
        console.log(successOBJ);
        if (successOBJ !== null) {
          if (successOBJ.password) {
            console.log('password property exist');
            SignInModel.findOneAndUpdate(decodeId, {
                $set: {
                  password: passwordEncrypt,
                },
              }, {
                new: true,
              }).then((success) => {
                if (success !== null) {
                  console.log(success);
                  console.log('successfully update object');
                  res.status(200).json({
                    status: true,
                    success: 'successfully done',
                  });
                }
              })
              .catch((err) => {
                console.log('error occur: ', err);
              });
          } else {
            console.log('password property does not exist');
            SignInModel.update(decodeId, {
                $set: {
                  password: passwordEncrypt,
                }
              })
              .then((success) => {
                if (success !== null) {
                  console.log(success);
                  console.log('successfully update object');
                  res.status(200).json({
                    status: true,
                    success: 'successfully done',
                  });
                }
              })
              .catch((err) => {
                console.log('does not exist error occur: ', err);
              });
          }
        }
      })
      .catch((err) => {
        console.log('error occur', err);
      });


  } catch (e) {
    console.log('eerror: token no longer available ', e);
    res.send({
      status: false,
      message: 'This password reset link is no longer valid, Please try again',
    });
  }
}

function userValidAuthentication(req, res) {
  console.log(req.body);
  const {
    email,
  } = req.body;
  console.log(email);
  const searchOBJ = {
    email,
  };
  SignInModel.findOne(searchOBJ)
    .then((success) => {
      if (success !== null) {
        console.log('user exist');
        console.log('data', success);
        const token = jwt.sign({
          id: success._id,
          email: success.email,
          username: success.username,
        }, config.jwtSecret, {
          expiresIn: '10m',
        });
        console.log('token made: ', token);
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.accountID, // generated ethereal user
            pass: config.accountpass, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"CrimeApp " <test@crimeApp.com>', // sender address
          to: email, // list of receivers
          subject: 'Password Reset', // Subject line
          text: 'Hello world?', // plain text body
          html: `<b>Reset Link: </b> https://infinite-retreat-19017.herokuapp.com/forgot_password/reset?token=${token}`, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        res.status(200).json({
          message: 'we just send an email to you with a link to reset your password',
        });
      } else {
        console.log('no user exisst')
        res.status(404).json({
          error: 'no user exists',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        serverError: 'datamodal error',
      });
    });
}


module.exports = {
  userValidAuthentication,
  saveUpdateUserObject,
  checkResetToken,
};