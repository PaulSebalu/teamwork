import teamworkModel from '../models/teamworkModel';

class Comment {
  // eslint-disable-next-line consistent-return
  static async createComment(req, res) {
    const { comment } = req.body;
    const sql = `INSERT INTO comments
      (comment, article, author, createdon) 
        VALUES ($1, $2, $3, $4) RETURNING *`;

    const { rows } = await teamworkModel.query(
      sql,
      [comment, req.article.id, req.user.id, new Date()],
      res
    );
    return res.status(201).json({
      status: 201,
      message: 'Comment successfully created',
      data: {
        createdOn: rows[0].createdon,
        articleTitle: req.article.title,
        article: req.article.article,
        comment: rows[0].comment,
        commentAuthor: rows[0].author
      }
    });
  }
}

export default Comment;
