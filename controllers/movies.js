const { ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorMovieDelete = require('../errors/ErrorMovieDelete');
const {
  OK,
} = require('../utils/const');

const getMoviesById = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
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
  const { movieById } = req.params;
  const { _id } = req.user;
  Movie.findById(movieById)
    .orFail(new ErrorNotFound('Данные не найдены'))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new ErrorMovieDelete('Вы не можете удалить не свой фильм'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Успешно выполнено' }));
    })
    .catch(next);
};

module.exports = {
  getMoviesById,
  createMovie,
  removeMovieById,
};