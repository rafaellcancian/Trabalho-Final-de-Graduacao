import knex from 'knex';
import { 
  pgDatabase, 
  pgHost, 
  pgPassword, 
  pgUser 
} from './environment';

const knexPg = knex({
  client: 'postgres',
  connection: {
    host : pgHost,
    user : pgUser,
    password : pgPassword,
    database : pgDatabase
  },
  useNullAsDefault: true
});

export { knexPg };
