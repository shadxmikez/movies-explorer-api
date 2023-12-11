const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'число запросов с одного IP в единицу времени ограничено',
});

module.exports = limiter;