const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you must have a name'],
    maxlength: [100, 'The username is too long'],
    minlength: [1, 'The username is too short']
  },
  email: {
    type: String,
    unique: true,
    maxlength: [250, 'The e-mail is too long'],
    required: [true, 'Please provide an E-mail'],
    validate: [validator.isEmail, 'Please provide currect E-mail']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'The password must contain a minimum of 8 characters '],
    maxlength: [250, 'The password must contain a miximum of 250 characters'],
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
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

// ============================= uscerSchema methods/pre-save/validations ==========================

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only run when password is modified
  this.password = await bcrypt.hash(this.password, 12); // Hash the password with cost of 12 - (random string with 12 length )
  this.confirmPassword = undefined; //Delete the confirm password
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password' || this.isNew)) return next();
  this.passwordChangedAt = Date.now();
  next();
});
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('user', userSchema);

module.exports = User;
