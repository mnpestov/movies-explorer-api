const express = require('express');
const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');
const NotFoundError = require('../errors/not-found-errors');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);
routes.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

exports.routes = routes;
