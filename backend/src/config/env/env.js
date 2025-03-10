require('dotenv').config();

const config = {
  port: process.env.PORT,
  databaseName: process.env.DATABASE_NAME,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseURL: process.env.DATABASE_URL
};

module.exports = config;
