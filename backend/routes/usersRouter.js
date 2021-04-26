const usersRouter = require('express').Router();
const { getUsers, getUser, getUserInfo, updateProfile, updateAvatar } = require('../controllers/users');
const { checkId, checkUpdateProfile, checkUpdateAvatar } = require('../middlewares/userRequestValidation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', checkId, getUser);
usersRouter.get('/users/me', getUserInfo);
usersRouter.patch('/users/me', checkUpdateProfile, updateProfile);
usersRouter.patch('/users/me/avatar', checkUpdateAvatar, updateAvatar);

module.exports = usersRouter;
