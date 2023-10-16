import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5431,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'mysecretpassword',
      database: process.env.DB_DATABASE || 'postgres',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

module.exports = config;
