const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const port = 7800;
app.use(express.json());

dotenv.config({ path: './config.env' });
const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/bCardRoutes');

mongoose
  .connect('mongodb://localhost:27017/hacker_u_users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(` connection to mongoose  succeed ! `);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`you're listening to port ${port}`);
});
