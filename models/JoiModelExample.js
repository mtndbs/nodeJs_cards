//=========DEMO==========
// example of usermodel using Joi validation
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(pass) {
        return pass === this.password; // this return the currect object that running in the schema
      },
      message: 'Passwords are not the same!'
    }
  },
  biz: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
    biz: Joi.boolean().required()
  });

  return schema.validate(user);
}
module.exports = { User, validateUser };
