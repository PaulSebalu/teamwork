import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'teamwork',
  password: 'mynameis',
  port: 5432
});

export default pool;
