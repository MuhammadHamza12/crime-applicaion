const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const signInSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
  },
  googleID: {
    type: String,
  },
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  familyName: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  userType: {
    type: String,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});
signInSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Users', signInSchema);