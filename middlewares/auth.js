const jwt = require('jsonwebtoken');

const ErrorAuth = require('../errors/ErrorAuth');

const { JWT_SECRET, NODE_ENV } = require('../utils/setup');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorAuth('Необходима авторизация'));
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new ErrorAuth('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;