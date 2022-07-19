const userRouter = require('./users/userRouter');
const movieRouter = require('./movie/movieRouter');
const listRouter = require('./list/listRouter');
const authRouter = require('./auth/authRouter');

module.exports = {
    userRouter,
    movieRouter,
    listRouter,
    authRouter,
};