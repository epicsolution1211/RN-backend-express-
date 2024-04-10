const { check, validationResult,param, body } = require('express-validator');
// const { param } = require('../../routes/user');

exports.validateUserSignUp = [
  check('fullname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required!')
    .isString()
    .withMessage('Must be a valid name!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be within 3 to 20 character!'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is empty!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 3 to 20 characters long!'),
  check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('Both password must be same!'+req.body.password);
      }
      return true;
    }),
];

exports.userVlidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ success: false, errors: errorMessages });
  }
  next();
};

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email / password is required!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('email / password is required!'),
];
