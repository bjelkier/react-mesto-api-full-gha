const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');

const INTERNAL_SERVER_ERROR = 500;
const { PORT = 3200 } = process.env;

const corsOptions = {
  origin: ['http://localhost:3000',
    'http://localhost:3200',
    'https://bjelkier.nomoredomainsicu.ru ',
    'http://api.bjelkier.nomoredomainsicu.ru '],
  credentials: true,
};

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors(corsOptions));

app.use('/', router);

app.use('/', errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
});
