/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.MY_PORT;
app.use(express.json());

const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/bCardRoutes');

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`connection to mongoose  succeed ! `);
  })
  .catch(err => {
    console.log(err);
  });

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);

// handling all routes errors that are not in the application
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} at this Server!`
  });
  next();
});

app.listen(port, () => {
  console.log(`you're listening to port ${port}`);
});
