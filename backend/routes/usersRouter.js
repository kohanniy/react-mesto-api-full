const usersRouter = require('express').Router();
const { getUsers, getMe, getUser, updateProfile, updateAvatar } = require('../controllers/users');
const { checkId, checkUpdateProfile, checkUpdateAvatar } = require('../middlewares/userRequestValidation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getMe);
usersRouter.patch('/users/me', checkUpdateProfile, updateProfile);
usersRouter.patch('/users/me/avatar', checkUpdateAvatar, updateAvatar);
usersRouter.get('/users/:id', checkId, getUser);

module.exports = usersRouter;
