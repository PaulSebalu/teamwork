import { Pool } from 'pg';
import env from 'dotenv';

env.config();

// eslint-disable-next-line import/no-mutable-exports
let pool;

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.DB_TEST
  });
} else {
  pool = new Pool({
    connectionString: process.env.DB
  });
}

export default pool;
