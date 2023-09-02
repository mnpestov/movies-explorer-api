require('dotenv').config();
const helmet = require('helmet');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { routes } = require('./routes');
const rateLimit = require('./middlewares/rate-limit');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = process.env;

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    'https://diplommnpestov.nomoredomains.rocks',
    'http://diplommnpestov.nomoredomains.rocks',
    'http://localhost:3001',
  ],
}));

app.use(requestLogger);
app.use(rateLimit);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(process.env.NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/movies-explorer-db', {
    useNewUrlParser: true,
  });
  await app.listen(PORT);
}

connect();
