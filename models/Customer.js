const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 12
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  address: {
    type: String,
    minlength: 6,
    maxlength: 350
  }
});

exports.Customer = mongoose.model('customer', customerSchema);
