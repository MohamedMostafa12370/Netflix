const userModel = require('../../../DB/Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = async(req, res) => {
    const { password, email } = req.body;
    try {
        const findEmail = await userModel.findOne({ email });
        if (findEmail) {
            const findPassword = await bcrypt.compare(password, findEmail.password);
            if (findPassword) {
                const userToken = jwt.sign({ id: findEmail._id, isLogedIn: true, isAdmin: findEmail.isAdmin },
                    process.env.JWT_KEY, { expiresIn: '24h' }
                );
                res.json({ message: 'Done', token: userToken });
            } else {
                res.json({ message: 'email or password is roning' });
            }
        } else {
            res.json({ message: 'email or password is roning' });
        }
    } catch (err) {
        res.json({ message: 'catch error from signin', err });
    }
};

module.exports = signin;