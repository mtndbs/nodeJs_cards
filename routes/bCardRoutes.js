const express = require('express');

const router = express.Router();
const cardController = require('./../controllers/bCardController');
const authController = require('./../controllers/authController');

router
  .route('/') //http://localhost:7800/api/cards
  .get(authController.protector, cardController.getAllcards)
  .post(authController.protector, cardController.createCard);

router
  .route('/my') //http://localhost:7800/api/cards/my
  .get(authController.protector, cardController.getMyCards);

router.get('/myjoi', authController.protector, cardController.getMyCardsJoi);

router
  .route('/:id') //http://localhost:7800/api/cards/:id
  .get(authController.protector, cardController.getOneCard)
  .put(authController.protector, cardController.upDateCard)
  .delete(authController.protector, cardController.deleteCard);

module.exports = router;
