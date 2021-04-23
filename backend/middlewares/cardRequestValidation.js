const { celebrate, Joi } = require('celebrate');

const checkCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/[www.]?[0-9a-z-]{2,}\.[a-z0-9]{2,6}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/),
  }),
});

module.exports = {
  checkCard,
};
