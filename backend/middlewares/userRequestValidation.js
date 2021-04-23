const { celebrate, Joi } = require('celebrate');

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const checkNewUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const checkUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/[www.]?[0-9a-z-]{2,}\.[a-z0-9]{2,6}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/),
  }),
});

module.exports = {
  checkId,
  checkLogin,
  checkNewUser,
  checkUpdateProfile,
  checkUpdateAvatar,
};
