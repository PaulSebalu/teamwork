import pool from './connectDb';

const dropTables = async () => {
  await pool.query('DROP TABLE IF EXISTS comments;');
  await pool.query('DROP TABLE IF EXISTS articles;');
  await pool.query('DROP TABLE IF EXISTS employees;');
};
dropTables();

export default dropTables;
