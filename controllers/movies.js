const { ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorMovieDelete = require('../errors/ErrorMovieDelete');
const {
  OK,
} = require('../utils/const');

const getMoviesById = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => res.status(OK).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ErrorCode('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const removeMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new ErrorNotFound('Данные не найдены');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ErrorMovieDelete('Вы не можете удалить не свой фильм');
      }

      Movie.findByIdAndDelete(req.params.movieId).select('-owner')
        .then((deletedMovie) => res.status(OK).send(deletedMovie));
    })
    .catch(next);
};

module.exports = {
  getMoviesById,
  createMovie,
  removeMovieById,
};