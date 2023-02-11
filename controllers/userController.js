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
