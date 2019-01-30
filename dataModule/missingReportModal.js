const mongoose = require('mongoose');

const missingPersonSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  missingname: {
    type: String,
  },
  date: {
    type: Date,
  },
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  adminStatus: {
    type: String,
    default: 'Pending..!',
  },
  userDataId: mongoose.Schema.Types.ObjectId,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('missingreport', missingPersonSchema);