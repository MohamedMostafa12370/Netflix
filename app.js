const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./DB/concetion');
const {
    userRouter,
    movieRouter,
    listRouter,
    authRouter,
} = require('./Routes/indexRouter');
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use(userRouter, movieRouter, listRouter, authRouter);

app.listen(port, () => {
    console.log(`Server Running: http://localhost:${port}`);
});