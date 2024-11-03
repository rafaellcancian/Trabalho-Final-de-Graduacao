import knex from 'knex';
import {
  pgHost,
  pgPort,
  pgUser,
  pgPassword,
  pgDatabase
} from './environment';

const knexPg = knex({
  client: 'postgres',
  connection: {
    host: pgHost,
    port: pgPort,
    user: pgUser,
    password: pgPassword,
    database: pgDatabase
  },
  useNullAsDefault: true
});

export { knexPg };
