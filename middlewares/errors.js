const httpConstants = require('http2').constants;

module.exports = ((err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Ошибка валидации id' });
  } else if (err.message === 'not found') {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
      .send({ message: 'Пользователь с указанным id не найден' });
  } else if (err.message === 'movie not found') {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
      .send({ message: 'Карточка с указанным id не найдена' });
  } else if (err.message === 'wrong login or password') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Не верный логин или пароль' });
  } else if (err.message === 'unauthorized') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  } else if (err.name === 'TokenExpiredError') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  } else if (err.name === 'ValidationError') {
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Ошибка валидации полей' });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'С токеном что-то не так' });
  } else if (err.message === 'OwnerID does not match movieID') {
    res.status(httpConstants.HTTP_STATUS_FORBIDDEN)
      .send({ message: 'ID владельца карточки не совпадает с ID карты' });
  } else if (err.message === 'Маршрут не найден') {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND)
      .send({ message: 'Маршрут не найден' });
  } else if (err.message === 'Такой пользователь уже существует') {
    res.status(httpConstants.HTTP_STATUS_CONFLICT)
      .send({ message: 'Такой пользователь уже существует' });
  } else {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на сервере' });
  }

  next();
});
