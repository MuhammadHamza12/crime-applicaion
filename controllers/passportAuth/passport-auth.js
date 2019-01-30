const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('../../config');
const UserModal = require('../../dataModule/signInModal');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModal.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: config.clientId,
    clientSecret: config.clientSecret,
  }, (accessToken, refreshToken, profile, done) => {
    console.log('callback fire');
    console.log(profile);
    const dataOBJ = {
      username: profile.displayName,
      googleId: profile.id,
    };
    UserModal.findOne({
      googleId: profile.id,
    }).then((currentUser) => {
      if (currentUser) {
        console.log('user exist: ', currentUser);
        done(null, currentUser);
      } else {
        const userData = new UserModal(dataOBJ);
        userData
          .save()
          .then((success) => {
            console.log(success);
            done(null, success);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }));