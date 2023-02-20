const express = require('express');

const router = express.Router();
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signUp); //http://localhost:7800/api/users/signup
router.post('/login', authController.logIn); //http://localhost:7800/api/users/login
router.get('/me', authController.protector, userController.getUser); // http://localhost:7800/api/users/me

router.post('/updatePassword', authController.protector, authController.updatePassword);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// עריכת משתמש שם ודוא"ל, לא התבקש במשימה
router.patch('/updateMe', authController.protector, userController.updateUser);

module.exports = router;
