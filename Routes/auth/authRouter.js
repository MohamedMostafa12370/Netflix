const router = require('express').Router();

const validationMethod = require('../../middelWear/validation');
const { signupValidation, signinValidation } = require('./authValidation');
const signin = require('./controller/signin');
const signup = require('./controller/signup');

router.post('/signup', validationMethod(signupValidation), signup);
router.post('/signin', validationMethod(signinValidation), signin);

module.exports = router;