const joi = require('joi');

const updateValidation = {
    body: joi
        .object()
        .required()
        .keys({
            name: joi.string().min(2).max(30).required().messages({
                'string.base': 'plz enter valid name char',
                'string.empty': 'plz fill u name ',
                'any.required': 'plz send u name ',
            }),
            email: joi.string().email(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            cpassword: joi.string().valid(joi.ref('password')),
            isAdmin: joi.boolean(),
        }),
    query: joi
        .object()
        .required()
        .keys({
            idUser: joi.string().min(24).max(24),
        }),
};

module.exports = updateValidation;