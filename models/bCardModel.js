const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  bName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  user_id: {
    type: String,
    maxlength: 300
  },
  bDiscription: {
    type: String,
    maxlength: 400
  },
  bAdress: {
    type: String,
    maxlength: 250
  },
  bPhone: {
    type: String,
    validate: [validator.isDecimal, 'Please provide a valid phone number']
  },
  bPhoto: {
    type: String
  },
  cardNum: {
    type: Number,
    unique: [true, 'somthing get wrong, try again'],
    default: () => Math.floor(100000 + Math.random() * 900000)
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Card = mongoose.model('card', cardSchema, 'cards');

module.exports = Card;
