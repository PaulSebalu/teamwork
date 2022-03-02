import pool from './connectDb';

const createEmployeesTable = `
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    gender VARCHAR(128),
    jobrole VARCHAR(128),
    department VARCHAR(128),
    address VARCHAR(128),
    usertype VARCHAR(12)
)`;

const createArticlesTable = `
CREATE TABLE IF NOT EXISTS articles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    article VARCHAR(128) NOT NULL,
    category VARCHAR(128),
    publishedon TIMESTAMP,
    author INT REFERENCES employees (id) ON DELETE CASCADE NOT NULL,
    flag boolean,
    flagcount INT	
)`;

const createCommentsTable = `
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(128) NOT NULL,
    article INT REFERENCES articles (id) ON DELETE CASCADE NOT NULL,
    author INT REFERENCES employees (id) ON DELETE CASCADE NOT NULL,
    createdon TIMESTAMP	
)`;

const createTables = async () => {
  const employees = createEmployeesTable;
  const articles = createArticlesTable;
  const comments = createCommentsTable;
  const query = `${employees}; ${articles}; ${comments};`;

  await pool.query(query);
};

createTables();

export default createTables;
