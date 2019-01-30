const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  userDataId: mongoose.Schema.Types.ObjectId,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  adminStatus: {
    type: String,
    default: 'Pending..!',
  },
});
module.exports = mongoose.model('complaintreports', complaintsSchema);
