const userModel = require('../../../DB/Models/userModel');

const stats = async(req, res) => {
    const today = new Date();
    const lastYeat = today.setFullYear(today.setFullYear() - 1);
    const monthArry = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    try {
        const data = await userModel.aggregate([{
                $project: {
                    month: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 },
                },
            },
        ]);
        res.json({ message: 'Done', data });
    } catch (err) {
        res.json({ message: 'catch error from stats month year', err });
    }
};

module.exports = stats;