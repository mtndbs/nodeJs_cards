const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you must have a name'],
    maxlength: 100,
    minlength: 1
  },
  email: {
    type: String,
    unique: true,
    maxlength: 150,
    required: true,
    validate: [validator.isEmail, 'please provide currect E-mail']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    maxlength: 200,
    select: false
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
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// ============================= uscerSchema methods ==========================

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only run when password is modified
  this.password = await bcrypt.hash(this.password, 12); // Hash the password with cost of 12 - (random string with 12 length )
  this.confirmPassword = undefined; //Delete the confirm password
  next();
});
const User = mongoose.model('user', userSchema);

// adding Error handling for the 'unique' parameter
userSchema.path('email').validate(async value => {
  const emailCount = await User.countDocuments({ email: value });
  return !emailCount;
}, 'Email already exists');

module.exports = User;
