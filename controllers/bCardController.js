// eslint-disable-next-line node/no-unsupported-features/node-builtins
const Card = require('./../models/bCardModel');

exports.getAllcards = async (req, res) => {
  try {
    const allCards = await Card.find({});

    res.status(200).json({
      status: 'success',
      results: allCards.length,
      data: allCards
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createCard = async (req, res) => {
  try {
    const decoded = req.user;
    req.body.user_id = decoded.id;
    const newCard = await Card.create(req.body);

    res.status(200).json({
      status: 'success',
      data: newCard
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getOneCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'problem with URL details' });
    }
    const oneCard = await Card.findById(id);
    res.status(200).json({
      status: 'success',
      data: oneCard
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.upDateCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'problem with URL details' });
    }
    const oneCard = await Card.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true // running schema validation also when updating
    });
    res.status(200).json({
      status: 'success',
      data: oneCard
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'problem with URL details' });
    }
    await Card.findByIdAndDelete(id);

    res.status(204).json({
      status: 'item has been deleted',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
exports.getMyCards = async (req, res) => {
  try {
    const decoded = req.user; // getting the user data from the middleware
    const myCards = await Card.find({ user_id: decoded.id });

    res.status(200).json({
      status: 'success',
      results: myCards.length,
      data: myCards
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
