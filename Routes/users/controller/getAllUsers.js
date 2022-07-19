const userModel = require('../../../DB/Models/userModel');

const allusers = async(req, res) => {
    const { isAdmin } = req.user;
    try {
        // check if admin first to see all user
        if (isAdmin) {
            const find = await userModel.find({}).select('-password');
            res.json({ message: 'all user', find });
        } else {
            // check if user wantt to see all user it is wrong
            res.json({ message: 'sorry you not admin to see all user' });
        }
    } catch (err) {
        res.json({ message: 'catch error from all user', err });
    }
};

module.exports = allusers;