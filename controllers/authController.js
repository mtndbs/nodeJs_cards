// eslint-disable-next-line node/no-unsupported-features/node-builtins
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // for more simple hashed token (reseting password)
const User = require('./../models/userModel');
const sendEmail = require('./../utils/email');
// Token sign function
const signToken = (id, biz) => {
  return jwt.sign({ id, biz }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
// ============================== secuirity middleware ===================================
exports.protector = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'Fail',
        message: 'You are not logged in! Please log in to get access'
      });
    }

    // verifiy token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // sending the user details inside the req object to the endpoint
    req.user = decoded;
    //check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        massage: 'The user belonging to this token does no longer exist.'
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message
    });
  }
};
// ================== end of security middleware ==========================

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const duplicateEmail = await User.findOne({ email: email });
    if (duplicateEmail) {
      return res
        .status(409)
        .json({ status: 'fail', message: 'This Email already exist' });
    }
    const newUser = await User.create({ name, email, password, confirmPassword });
    res.status(200).json({
      status: 'success',
      data: _.pick(newUser, ['_id', 'name', 'email']),
      message: 'user has been registered successfully'
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message
    });
  }
};
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'There is no email or password' });
    }

    const user = await User.findOne({ email }).select('+password'); // +password because password set to select false
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ status: 'email or passwrod are invalid' });
    }
    const token = signToken(user._id, user.biz);
    if (!token) {
      return res.status(401).json({
        status: 'There was problem with your authentication, please sign again'
      });
    }
    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      // secure: true,  //on development, secure will be false
      httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions);

    res.status(200).json({
      status: 'success',
      token: token
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    });
  }
};

//==========================Reseting password ====================== not required

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ status: 'fail', message: 'there is no user with this email' });
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetpassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      status: 'fail',
      message: 'There was an error with the Email sending, please try again'
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Token is invalid or has expired' });
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const token = signToken(user._id, user.biz);
    res.status(200).json({
      status: 'success',
      data: token
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updatePassword = async (req, res) => {
  const { password, confirmPassword, currentPassword } = req.body;
  if (!password || !confirmPassword || !currentPassword) {
    return res.status(404).json({ status: 'missing one of the values' });
  }
  const user = await User.findById(req.user.id).select('+password');
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(400).json({ status: 'email or passwrod are invalid' });
  }
  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  const token = signToken(user._id, user.biz);
  res.status(201).json({
    status: 'success',
    token: token // At real will be send as secret cookie to the client
  });
};
