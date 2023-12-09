const router = require('express').Router();

const auth = require('../middlewares/auth');

const ErrorNotFound = require('../errors/ErrorNotFound');

const { authValidate, createUserValidate } = require('../utils/validity');
const { login, createUser } = require('../controllers/users');

router.post('/signin', authValidate, login);
router.post('/signup', createUserValidate, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

module.exports = router;