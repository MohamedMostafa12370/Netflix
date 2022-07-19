const userModel = require('../../../DB/Models/userModel');
const bcrypt = require('bcrypt');

const updateuser = async(req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const { id, isAdmin: adminORuser } = req.user;
    const { idUser } = req.query;
    try {
        // check if is admin or not
        if (adminORuser) {
            // check if admin send id user to update
            if (idUser) {
                // check if admin send id and email and password to update
                if (email && password) {
                    const findEmail = await userModel.findOne({ email });
                    if (findEmail) {
                        res.json({ message: 'email is exict tru another' });
                    } else {
                        // after check  email is not exict ok add new email and password
                        const hash = await bcrypt.hash(
                            password,
                            parseInt(process.env.HASHROUND)
                        );
                        const finduser = await userModel
                            .findByIdAndUpdate({ _id: idUser }, { name, isAdmin, email, password: hash }, { new: true })
                            .select('-password');
                        res.json({ message: 'Done admin update user', finduser });
                    }
                } else {
                    // after check admin don't send email and password just upate name and isAdmin
                    const finduser = await userModel
                        .findByIdAndUpdate({ _id: idUser }, { name, isAdmin }, { new: true })
                        .select('-password');
                    res.json({ message: 'Done admin update user', finduser });
                }
            } else {
                // check if admin want change his email and password
                if (email && password) {
                    const findEmail = await userModel.findOne({ email });
                    // check if email is exict or not
                    if (findEmail) {
                        res.json({ message: 'email is exict admin try another' });
                    } else {
                        // after check email is not exict add new email and password
                        const hash = await bcrypt.hash(
                            password,
                            parseInt(process.env.HASHROUND)
                        );
                        const upateAdmin = await userModel
                            .findByIdAndUpdate({ _id: id }, { name, email, password: hash }, { new: true })
                            .select('-password');
                        res.json({
                            message: 'Done admin update name email password',
                            upateAdmin,
                        });
                    }
                } else {
                    // after check admin want update his self just name only
                    const findAdmin = await userModel
                        .findByIdAndUpdate({ _id: id }, { name }, { new: true })
                        .select('-password');
                    res.json({
                        message: 'Done admin update his name',
                        findAdmin,
                    });
                }
            }
        } else {
            // after check he is user and want to change email and password
            if (email && password) {
                const findEmail = await userModel.findOne({ email });
                // check if email is exict or not
                if (findEmail) {
                    res.json({ message: 'email is exict try another' });
                } else {
                    // after check email is not used ok add new email and password
                    const hash = await bcrypt.hash(
                        password,
                        parseInt(process.env.HASHROUND)
                    );
                    const updateUser = await userModel
                        .findByIdAndUpdate({ _id: id }, { name, email, password: hash }, { new: true })
                        .select('-password');
                    res.json({ message: 'Done', updateUser });
                }
            } else {
                // after check user want to update his new only
                const find = await userModel
                    .findByIdAndUpdate({ _id: id }, { name }, { new: true })
                    .select('-password');
                res.json({ message: 'Done user update his name', find });
            }
        }
    } catch (err) {
        res.json({ message: 'catch error from update user', err });
    }
};

module.exports = updateuser;