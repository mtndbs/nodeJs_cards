const express = require('express');

const router = express.Router();
// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

router.route('/signup').post(authController.signUp); //http://localhost:7800/api/users/signup
router.route('/login').post(authController.logIn); //http://localhost:7800/api/users/login
router.route('/me').get(authController.protector, userController.getUser); // http://localhost:7800/api/users/me

router.route('/forgotpassword').post(authController.forgotPassword);
// פה עתיד להיות עריכת משתמש וכו, לא התבקש בעבודה
router // http://localhost:7800/api/users
  .route('/')
  .get(authController.protector)
  .post(authController.protector);

module.exports = router;
