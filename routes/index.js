const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');
const NotFoundError = require('../errors/not-found-errors');

const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');

const routes = express.Router();

routes.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
routes.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

exports.routes = routes;
