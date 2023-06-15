const httpConstants = require('http2').constants;
const { Movie } = require('../models/movie');
const NotFoundError = require('../errors/not-found-errors');
const ForbidenError = require('../errors/forbiden-errors');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(httpConstants.HTTP_STATUS_OK)
      .send(movies);
  } catch (err) {
    next(err);
  }
};
exports.createMovie = async (req, res, next) => {
  try {
    const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
    const owner = req.user._id;
    const newMovie = await Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner });
    const movie = await Movie.populate(newMovie, 'owner');
    res.status(httpConstants.HTTP_STATUS_CREATED)
      .send(movie);
  } catch (err) {
    next(err);
  }
};
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(['owner']);
    if (!movie) {
      throw new NotFoundError('movie not found');
    }
    if (movie.owner._id.toString() === req.user._id) {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id).populate(['owner']);
      if (!deletedMovie) {
        throw new NotFoundError('movie not found');
      }
      res.status(httpConstants.HTTP_STATUS_OK)
        .send(deletedMovie);
    } else {
      throw new ForbidenError('OwnerID does not match movieID');
    }
  } catch (err) {
    next(err);
  }
};
