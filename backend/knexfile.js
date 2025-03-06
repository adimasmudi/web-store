const config = require('./src/config/env/env');

// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: config.databaseName,
      user: config.databaseUser,
      password: config.databasePassword
    },
    migrations: {
      directory: './src/config/database/migrations'
    },
    seeds: {
      directory: './src/config/database/seed'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: config.databaseName,
      user: config.databaseUser,
      password: config.databasePassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/config/database/migrations'
    },
    seeds: {
      directory: './src/config/database/seed'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: config.databaseName,
      user: config.databaseUser,
      password: config.databasePassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/config/database/migrations'
    },
    seeds: {
      directory: './src/config/database/seed'
    }
  }
};
