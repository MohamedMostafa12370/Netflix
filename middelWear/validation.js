const dataMethod = ['body', 'params', 'query'];

const validationMethod = (schema) => {
    return (req, res, next) => {
        const ArrsyError = [];
        dataMethod.forEach((key) => {
            if (schema[key]) {
                const result = schema[key].validate(req[key], {
                    abortEarly: false,
                });
                if (result.error) {
                    ArrsyError.push(result.error.details);
                }
            }
        });
        if (ArrsyError.length) {
            res.json({ message: 'validation error', err: ArrsyError });
        } else {
            next();
        }
    };
};

module.exports = validationMethod;