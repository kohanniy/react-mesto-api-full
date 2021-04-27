const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

// Находим все карточки
function getCards(req, res, next) {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

// Создаем карточку
function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Введены неверные данные');
        next(error);
      }
      next(err);
    });
}

// Удаляем карточку
function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет такой карточки');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалять карточки других пользователей');
      }

      card.remove();
      return res.status(200).send({ message: 'Карточка была удалена' });
    })
    .catch(next);
}

// Ставим лайк
function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(200).send(card);
    })
    .catch(next);
}

// Удаляем лайк
function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(200).send(card);
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
