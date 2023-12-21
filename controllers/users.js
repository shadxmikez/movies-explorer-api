const { ValidationError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../utils/setup');
const ErrorEmail = require('../errors/ErrorEmail');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const {
  OK,
} = require('../utils/const');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.status(OK).send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(OK).send(user.toJSON()))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrorEmail('Пользователь с таким email уже существует!'));
      } else if (err instanceof ValidationError) {
        next(new ErrorCode('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getUserId = (req, res, next, id) => {
  User.findById(id)
    .orFail(new ErrorNotFound('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const infoUsers = (req, res, next) => {
  const { _id } = req.user;
  getUserId(req, res, next, _id);
};

const changeUsersInfoDecorator = (req, res, next, changeUsers) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, changeUsers, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrorEmail('Пользователь с таким email уже существует!'));
      } else if (err instanceof ValidationError) {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const loadUsers = (req, res, next) => {
  const { name, email } = req.body;
  changeUsersInfoDecorator(req, res, next, { name, email });
};

module.exports = {
  login,
  createUser,
  infoUsers,
  loadUsers,
};
