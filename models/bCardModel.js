const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

const cardSchema = new mongoose.Schema({
  bName: {
    type: String,
    required: [true, 'Buisness name is required'],
    minlength: [1, 'Buisness name is too short'],
    maxlength: [250, 'Buisness name can not be more then 250 letters']
  },
  user_id: {
    type: String,
    maxlength: 300
  },
  bDiscription: {
    type: String,
    maxlength: [2000, 'Buisness card can not be more then 2000 letters']
  },
  bAdress: {
    type: String,
    maxlength: [250, 'Buisness adress can not be more then 250 letters']
  },
  bPhone: {
    type: String,
    minlength: [6, 'Phone number is too short'],
    maxlength: [250, 'Phone number is too long'],
    validate: [validator.isDecimal, 'Please provide a valid phone number']
  },
  bPhoto: {
    type: String,
    default: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`
  },
  cardNum: {
    type: Number,
    //סיכוי נמוך מאוד למספר תואם באופן רנדומלי, לכן לא רציתי להכניס בפונקציה בדיקה מול השרת בכל פוסט שתעמיס סתם
    unique: [true, 'somthing get wrong, try again'],
    default: () => {
      const randomNumber = _.random(1000, 999999);
      return randomNumber;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Card = mongoose.model('card', cardSchema, 'cards');

module.exports = Card;
