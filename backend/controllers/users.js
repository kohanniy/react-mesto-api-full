const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

// Вход в систему
function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000 * 7,
        httpOnly: true,
        sameSite: true,
      }).send(user);
    })
    .catch(next);
}

// Выход из системы
function logout(req, res, next) {
  try {
    res.cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
      sameSite: true,
    }).send({ message: 'Вы вышли из приложения' });
  } catch (err) {
    next(err);
  }
}

// Находим всех пользователей
function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

// Находим себя
function getMe(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найде');
      }
      return res.status(200).send(user);
    })
    .catch(next);
}

// Находим конкретного пользователя
function getUser(req, res, next) {
  User.findById(req.params.id)
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
      const { _id, email, name, about, avatar } = user;
      res.status(201).send({ _id, email, name, about, avatar });
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
  User.findByIdAndUpdate(req.user._id, { name, about })
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

  User.findByIdAndUpdate(req.user._id, { avatar })
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
  logout,
  getUsers,
  getMe,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
