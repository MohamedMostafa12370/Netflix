const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose
        .connect(`${process.env.DB_URL}`)
        .then((result) => {
            console.log('connection to DB Success');
        })
        .catch((err) => {
            console.log('Error From DB', err);
        });
};
module.exports = connectDB;