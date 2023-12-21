const {
  PORT = 3000,
  DB = 'mongodb://localhost:27017/diplomdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  DB,
  NODE_ENV,
  JWT_SECRET,
};