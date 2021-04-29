const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
}

// Находим всех пользователей
function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

// Находим конкретного пользователя
function getUser(req, res, next) {
  User.findById(req.params.id === 'me' ? req.user : req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
}

// Создаем пользователя
function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      const { _id, email } = user;
      res.status(201).send({ _id, email });
    })
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        const error = new ConflictError('Пользователь с таким email уже существует');
        next(error);
      }
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Введены неверные данные');
        next(error);
      }
      next(err);
    });
}

// Обновляем профиль
function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Введены неверные данные');
        next(error);
      }
      next(err);
    });
}

// Обновляем аватар
function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Введены неверные данные');
        next(error);
      }
      next(err);
    });
}

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
