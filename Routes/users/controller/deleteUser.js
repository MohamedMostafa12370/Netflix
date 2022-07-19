const userModel = require('../../../DB/Models/userModel');

const deleteuser = async(req, res) => {
    const { id, isAdmin } = req.user;
    const { idUser } = req.query;
    console.log(idUser);
    try {
        // check if he is admin fiest
        if (isAdmin) {
            // check if dmin want delete any user by id
            if (idUser) {
                const deleteUser = await userModel.findByIdAndDelete({ _id: idUser });
                res.json({ message: 'Done delete user by admin', deleteUser });
            } else {
                // check if dmin want delete his self
                const deleteAdmin = await userModel.findByIdAndDelete({ _id: id });
                res.json({ message: 'Done delete admin by his Self', deleteAdmin });
            }
        } else {
            // check if anu user want delete his self
            const user = await userModel.findByIdAndDelete({ _id: id });
            res.json({ message: 'Done delete user by his Self', user });
        }
    } catch (err) {
        res.json({ message: 'catch error from delete user', err });
    }
};

module.exports = deleteuser;