const jwt = require('jsonwebtoken');
const userModel = require('../DB/Models/userModel');

const auth = () => {
    return async(req, res, next) => {
        const headerToken = req.headers['authorization'];
        try {
            if (!headerToken ||
                headerToken == null ||
                headerToken == undefined ||
                !headerToken.startsWith(`${process.env.auth_key} `)
            ) {
                res.json({ message: 'in-valid header token' });
            } else {
                const token = headerToken.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (decoded) {
                    const findId = await userModel.findById(decoded.id);
                    if (findId) {
                        req.user = findId;
                        next();
                    } else {
                        res.json({ message: 'in-valid user id' });
                    }
                } else {
                    res.json({ message: 'in-valid user token' });
                }
            }
        } catch (err) {
            res.json({ message: 'catch error from authorization', err });
        }
    };
};

module.exports = auth;