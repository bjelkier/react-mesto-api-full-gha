const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const INTERNAL_SERVER_ERROR = 500;
const { PORT = 9000 } = process.env;

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/', router);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(errorLogger);

app.use('/', errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
  next();
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
});
