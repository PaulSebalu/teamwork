import teamworkModel from '../models/teamworkModel';

// eslint-disable-next-line consistent-return
const articleExists = async (req, res, next) => {
  const sql = `SELECT * FROM articles where id = $1`;
  const { rows } = await teamworkModel.query(sql, [req.params.id], res);

  if (rows.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'Article does not exist'
    });
  }
  // eslint-disable-next-line prefer-destructuring
  req.article = rows[0];
  next();
};

export default articleExists;
