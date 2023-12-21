const router = require('express').Router();

const { movieValidate, removeMovieIdValidate } = require('../utils/validity');
const { getMoviesById, createMovie, removeMovieById } = require('../controllers/movies');

router.get('/', getMoviesById);
router.post('/', movieValidate, createMovie);
router.delete('/:movieId', removeMovieIdValidate, removeMovieById);

module.exports = router;