const router = require('express').Router();

const auth = require('../middlewares/auth');
const Users = require('./users');
const Movies = require('./movies');

const ErrorNotFound = require('../errors/ErrorNotFound');

const { authValidate, createUserValidate } = require('../utils/validity');
const { login, createUser } = require('../controllers/users');

router.post('/signin', authValidate, login);
router.post('/signup', createUserValidate, createUser);

router.use('/users', auth, Users);
router.use('/movies', auth, Movies);

router.use('/*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

module.exports = router;