import { knexSnakeCaseMappers } from 'objection';
import * as path from 'path';
import { config } from './src/config';

const defaultKnexConfig = {
  client: 'sqlite3',
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve('knex/migrations'),
  },
  seeds: {
    directory: path.resolve('knex/seeds'),
  },
  ...knexSnakeCaseMappers(),
  useNullAsDefault: true,
};

export default {
  development: {
    ...defaultKnexConfig,
    connection: { filename: config.dbFilename },
  },
};
