const jwt = require('jsonwebtoken');
// eslint-disable-next-line node/no-unsupported-features/node-builtins

const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');
// token sign function
const signToken = (id, biz) => {
  return jwt.sign({ id, biz }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
// ============================== secuirity middleware ===================================
exports.protector = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: 'Fail', message: 'You are not logged in! Please log in to get access' });
    }

    //  Verifiy token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //Check if user still exists
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
    const newUser = await User.create(req.body);
    const { name, email, _id } = newUser;
    res.status(200).json({
      status: 'success',
      data: { name, email, _id },
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
      return res.status(400).json({ status: 'no email and password' });
    }

    const user = await User.findOne({ email }).select('+password'); // +password because password set to select false
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ status: 'email or passwrod are invalid' });
    }
    const token = signToken(user._id, user.biz);
    if (!token) {
      return res
        .status(401)
        .json({ status: 'There was problem with your authentication, please sign again' });
    }
    res.status(200).json({
      status: 'success',
      token: token // At real will be send as secret cookie to the client
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
