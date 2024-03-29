/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');

const cors = require('cors');

require('./cron/cronApp');

dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.PORT;

const limiter = rateLimiter({
  max: 460,
  windowMs: 60 * 60 * 1000,
  message: 'To many request from this IP , please try again later'
});
// ================= Global middleWare =================
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());

// HELMET secure your Express apps by setting various HTTP headers
app.use(helmet());
// Limit the http request fro
app.use('/api', limiter);
app.use(express.json({ limit: '20kb' }));
app.use(mongoSanitize());
app.use(xss());

// ================= Global middleWare =================

const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/bCardRoutes');
const tasksRouter = require('./routes/tasksRouter');
const projectsRouter = require('./routes/projectsRouter');
const authController = require('./controllers/authController');
const employeesRouter = require('./routes/employees');
const customersRouter = require('./routes/customers');
const openViewRouter = require('./routes/openEmployeeRoute');

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: process.env.DBNAME
  })
  .then(() => {
    console.log(`connection to mongoose  succeed ! `);
  })
  .catch(err => {
    console.log(err);
  });

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
app.use('/api/employView', openViewRouter);
app.use('/api/tasks', authController.protector, tasksRouter);
app.use('/api/projects', authController.protector, projectsRouter);
app.use('/api/employees', authController.protector, employeesRouter);
app.use('/api/customers', authController.protector, customersRouter);

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
