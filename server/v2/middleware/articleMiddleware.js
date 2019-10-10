import pool from '../services/connectDb';

const articleExists = (req, res, next) => {
  pool.query(
    'SELECT * FROM articles where id = $1',
    [req.params.id],
    // eslint-disable-next-line consistent-return
    (err, results) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.detail
        });
      }
      if (results.rows.length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Article does not exist'
        });
      }
      // eslint-disable-next-line prefer-destructuring
      req.article = results.rows[0];
      next();
    }
  );
};

export default articleExists;
