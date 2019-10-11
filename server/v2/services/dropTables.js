import pool from './connectDb';

const dropTables = async () => {
  await pool.query('DROP TABLE comments;');
  await pool.query('DROP TABLE articles;');
  await pool.query('DROP TABLE employees;');
};
dropTables();

export default dropTables;
