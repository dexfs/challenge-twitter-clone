// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
console.log('dsn', process.env.DATABASE_DSN);
module.exports = {
  development: {
    url: process.env.DATABASE_DSN,
    dialect: process.env.DATABASE_DSN.split(':')[0],
  },
  production: {
    url: process.env.DATABASE_DSN,
    dialect: process.env.DATABASE_DSN.split(':')[0],
  },
};
