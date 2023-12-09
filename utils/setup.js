const {
  PORT = 3000,
  DB = 'mongodb://localhost:27017/diplomdb',
  NODE_ENV,
  JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTg5NzgyMSwiaWF0IjoxNzAxODk3ODIxfQ.0KvAe2UnejLXDTFBAg_dwxygFwiKWPwXf0WB91Y35FI',
} = process.env;

module.exports = {
  PORT,
  DB,
  NODE_ENV,
  JWT_SECRET,
};