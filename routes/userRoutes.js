const express = require('express');

const router = express.Router();
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signUp); //http://localhost:7800/api/users/signup
router.post('/login', authController.logIn); //http://localhost:7800/api/users/login
router.get('/me', authController.protector, userController.getUser); // http://localhost:7800/api/users/me

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
// פה עתיד להיות עריכת משתמש וכו, לא התבקש בעבודה
router // http://localhost:7800/api/users
  .route('/')
  .get(authController.protector)
  .post(authController.protector);

module.exports = router;
