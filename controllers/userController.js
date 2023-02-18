const User = require('./../models/userModel');

exports.getUser = async (req, res) => {
  try {
    //  Verifiy token
    const decoded = req.user;
    const currentUser = await User.findById(decoded.id);
    res.status(200).json({ status: 'success', 'User details': currentUser });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.password || req.body.confirmPassword) {
    return res.status(400).json({
      status: 'fail',
      message:
        'You cannot change the password at this endpoint, please go to path /users/resetpassword '
    });
  }
  const { name, email } = req.body;

  const duplicateEmail = await User.findOne({ email: email });
  if (duplicateEmail) {
    return res.status(409).json({ status: 'fail', message: 'This Email already exist' });
  }
  try {
    const upDatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: 'success', data: upDatedUser });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
