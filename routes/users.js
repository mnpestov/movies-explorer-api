const express = require('express');

const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

exports.userRoutes = userRoutes;
