const userModel = require('../../../DB/Models/userModel');

const oneuser = async(req, res) => {
    const { _id, isAdmin } = req.user;
    try {
        if (isAdmin) {
            const find = await userModel.findById(_id).select('-password');
            if (find) {
                res.json({ message: 'Done Admin Profail', find });
            } else {
                res.json({ message: 'in-valid user id' });
            }
        } else {
            const find = await userModel.findById(_id).select('-password');
            if (find) {
                res.json({ message: 'Done user profail', find });
            } else {
                res.json({ message: 'in-valid user id' });
            }
        }
    } catch (err) {
        res.json({ message: 'catch error from one user', err });
    }
};

module.exports = oneuser;