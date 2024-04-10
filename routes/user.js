const express = require('express');
const {validationResult,check} = require('express-validator');
// const validateUserData = [
//   check('fullname')
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Name is required!')
//     .isString()
//     .withMessage('Must be a valid name!')
//     .isLength({ min: 3, max: 20 })
//     .withMessage('Name must be within 3 to 20 character!'),
//   check('email')
//     .normalizeEmail()
//     .isEmail()
//     .withMessage('Invalid email!'),
//   check('password')
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Password is empty!')
//     .isLength({ min: 8, max: 20 })
//     .withMessage('Password must be 3 to 20 characters long!'),
//   check('confirmPassword')
//     .trim()
//     .not()
//     .isEmpty()
//     .custom((value, { req }) => {
//       console.log(value)
//       if (value != req.body.password) {
//         throw new Error('Both password must be same!'+req.body.password);
//       }
//       return true;
//     }),
// ];

const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);

module.exports = router;
