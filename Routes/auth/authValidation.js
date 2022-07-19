const joi = require('joi');

const signupValidation = {
    body: joi
        .object()
        .required()
        .keys({
            name: joi.string().min(2).max(30).required().messages({
                'string.base': 'plz enter valid name char',
                'string.empty': 'plz fill u name ',
                'any.required': 'plz send u name ',
            }),
            email: joi.string().email().required(),
            password: joi
                .string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            cpassword: joi.string().valid(joi.ref('password')).required(),
            isAdmin: joi.boolean(),
        }),
};

const signinValidation = {
    body: joi
        .object()
        .required()
        .keys({
            email: joi.string().email().required(),
            password: joi
                .string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
        }),
};

module.exports = {
    signupValidation,
    signinValidation,
};