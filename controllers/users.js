const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const NotFoundError = require('../errors/not-found-errors');
const UnauthorizedError = require('../errors/unauthorized-erros');
const ConflictError = require('../errors/conflict-errors');

const SOLT_ROUNDS = 10;

exports.getUserInfo = async (req, res, next) => {
  try {
    const userById = await User.findById(req.user._id);
    if (!userById) {
      throw new NotFoundError('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(userById);
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('wrong login or password');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('wrong login or password');
    }
    const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SOLT : 'dev-secret', { expiresIn: '7d' });
    res.status(httpConstants.HTTP_STATUS_OK)
      .send({ token });
  } catch (err) {
    next(err);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;
    const hash = await bcrypt.hash(password, SOLT_ROUNDS);
    const newUser = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send({
        email: newUser.email,
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
      });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Такой пользователь уже существует'));
    } else {
      next(err);
    }
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('not found');
    }
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(updatedUser);
  } catch (err) {
    next(err);
  }
};
