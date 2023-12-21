require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { PORT, DB } = require('./utils/setup');
const centralizedErrors = require('./middlewares/centralized-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/ip-limiter');

const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(centralizedErrors);

mongoose.connect(DB, {
})
  .then(() => console.log('Successful connection to MongoDB'))
  .catch((error) => console.error('Connection to MongoD failed', error));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});