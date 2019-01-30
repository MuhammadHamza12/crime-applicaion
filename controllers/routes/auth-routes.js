const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config');
const Usermodal = require('../../dataModule/signInModal');

const authRouter = express.Router();
authRouter.get('/login', (req, res) => {
  res.send('login');
});

authRouter.get('/logout', (req, res) => {
  res.send('loggin out');
});

authRouter.post('/authFacebook', (req, res) => {
  console.log(req.body);
  const facebookData = req.body;
  const {
    email,
    id,
    name,
    picUrl,
  } = facebookData;
  const Dataobj = {
    username: name,
    email,
    facebookId: id,
    imageUrl: picUrl,
    userType: 'socialUser',
  };
  const updatData = {
    facebookId: id,
    imageUrl: picUrl,
    userType: 'socialUser',
  };
  const searchID = {
    email: Dataobj.email,
  };
  Usermodal.findOne(searchID)
    .then((currentUser) => {
      if (currentUser) {
        console.log('user exist: ', currentUser);
        const token = jwt.sign({
          id: currentUser._id,
          username: currentUser.username,
          email: currentUser.email,
        }, config.jwtSecret, {
          expiresIn: '1d',
        });
        res.json({
          token,
          message: 'user exist',
        });
        Usermodal.update(searchID, {
          $set: {
            facebookId: id,
            imageUrl: picUrl,
            userType: 'socialUser',
          },
        }).then((success) => {
          console.log('success obj', success);
          if (success !== null) {
            console.log('record updated');
          } else {
            console.log('object is null');
          }
        }).catch((err) => {
          console.log('Error in updating', err);
          res.json({
            err,
            error: 'error in update data object',
          });
        });
      } else {
        const DataModal = new Usermodal(Dataobj);
        DataModal
          .save()
          .then((success) => {
            const token = jwt.sign({
              id: success._id,
              username: success.username,
              email: success.email,
            }, config.jwtSecret, {
              expiresIn: '20m',
            });
            res.json({
              token,
              message: 'new user',
            });
          })
          .catch((err) => {
            res.json({
              err,
              error: 'error in saving data object',
            });
          });
      }
    })
    .catch((err) => {
      console.log('error occur: ', err);
    });
});

authRouter.post('/authGoogle', (req, res) => {
  console.log(req.body);
  const googleData = req.body;
  const {
    googleId,
    email,
    name,
    imageUrl,
    givenName,
    familyName,
  } = googleData;
  const newUserData = {
    googleID: googleId,
    username: name,
    email,
    imageUrl,
    givenName,
    userType: 'socialUser',
  };
  const DataObj = {
    googleID: googleId,
    name,
    imageUrl,
    familyName,
    userType: 'socialUser',
  };
  console.log('google id:', DataObj.googleID);
  const searchID = {
    email: newUserData.email,
  };
  Usermodal.findOne({
      email: newUserData.email,
    })
    .then((currentUser) => {
      if (currentUser) {
        console.log('user exist: ', currentUser);
        console.log('id', currentUser._id);
        const token = jwt.sign({
          id: currentUser._id,
          username: currentUser.username,
          email: currentUser.email,
          type: currentUser.type,
        }, config.jwtSecret, {
          expiresIn: '1d',
        });
        res.json({
          token,
        });
        Usermodal.update(searchID, {
          $set: {
            googleID: googleId,
            name,
            imageUrl,
            familyName,
            userType: 'socialUser',
          },
        }).then((success) => {
          console.log('success obj', success);
          if (success !== null) {
            console.log('record updated');
          } else {
            console.log('object is null');
          }
        }).catch((err) => {
          console.log('Error in updating', err);
          res.json({
            err,
            error: 'error in update data object',
          });
        });
      } else {
        console.log('currentUser', currentUser);
        const DataModal = new Usermodal(newUserData);
        DataModal
          .save()
          .then((success) => {
            const token = jwt.sign({
              id: success._id,
              username: success.username,
              email: success.email,
              type: success.type,
            }, config.jwtSecret, {
              expiresIn: '20m',
            });
            res.json({
              token,
            });
          })
          .catch((err) => {
            res.json({
              err,
              error: 'error in saving data object',
            });
          });
      }
    });
});

authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile'],
  prompt: 'select_account',
}));
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {

});

module.exports = authRouter;