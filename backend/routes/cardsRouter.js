const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { checkCard } = require('../middlewares/cardRequestValidation');
const { checkId } = require('../middlewares/userRequestValidation');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', checkCard, createCard);
cardsRouter.delete('/cards/:cardId', checkId, deleteCard);
cardsRouter.put('/cards/:cardId/likes', checkId, likeCard);
cardsRouter.delete('/cards/:cardId/likes', checkId, dislikeCard);

module.exports = cardsRouter;
