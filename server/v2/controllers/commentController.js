import pool from '../services/connectDb';

class Comment {
  // eslint-disable-next-line consistent-return
  static async createComment(req, res) {
    const { comment } = req.body;
    const query = `INSERT INTO comments
      (comment, article, author, createdon) 
        VALUES ($1, $2, $3, $4) RETURNING *`;
    pool.query(
      query,
      [comment, req.article.id, req.user.id, new Date()],
      (err, comments) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        return res.status(201).json({
          status: 201,
          message: 'Comment successfully created',
          data: {
            createdOn: comments.rows[0].createdon,
            articleTitle: req.article.title,
            article: req.article.article,
            comment: comments.rows[0].comment,
            commentAuthor: comments.rows[0].author
          }
        });
      }
    );
  }
}

export default Comment;
