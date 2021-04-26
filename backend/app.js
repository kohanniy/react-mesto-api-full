const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/usersRouter');
const cardsRouter = require('./routes/cardsRouter');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { checkLogin, checkNewUser } = require('./middlewares/userRequestValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.options('*', cors({
  origin: [
    'http://mesto.kohanniy.nomoredomains.club/',
    'https://mesto.kohanniy.nomoredomains.club/',
    'https://infallible-agnesi-ade491.netlify.app/',
  ],
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('*', cors({
  origin: [
    'http://mesto.kohanniy.nomoredomains.club/',
    'https://mesto.kohanniy.nomoredomains.club/',
    'https://infallible-agnesi-ade491.netlify.app/',
  ],
  credentials: true,
}));

app.post('/signup', checkNewUser, createUser);
app.post('/signin', checkLogin, login);

app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение слушает порт ${PORT}`);
});
