const userModel = require('../../../DB/Models/userModel');
const bcrypt = require('bcrypt');

const signup = async(req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const findEmail = await userModel.findOne({ email });
        if (findEmail) {
            res.json({ message: 'email is excit try another' });
        } else {
            const hashPassword = await bcrypt.hash(
                password,
                parseInt(process.env.HASHROUND)
            );
            const user = await userModel.insertMany({
                name,
                email,
                password: hashPassword,
                isAdmin,
            });
            res.json({ message: 'Done' });
        }
    } catch (err) {
        res.json({ message: 'catch error from sigup user', err });
    }
};

module.exports = signup;