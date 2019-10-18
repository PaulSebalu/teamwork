import Moment from 'moment';
import teamworkModel from '../models/teamworkModel';

class Article {
  // eslint-disable-next-line consistent-return
  static async CreateArticle(req, res) {
    const { title, article, category } = req.body;

    const sql = `INSERT INTO articles
    (title, article, category, publishedon, author, 
        flag, flagcount) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const { rows } = await teamworkModel.query(
      sql,
      [
        title.trim(),
        article.trim(),
        (category && category.trim()) || '',
        new Date(),
        req.user.id,
        false,
        0
      ],
      res
    );
    if (rows) {
      return res.status(201).json({
        status: 201,
        message: 'Article successfully created',
        data: {
          createdOn: new Moment(rows[0].publishedon).format('MMM-DD-Y HH:mm'),
          title: rows[0].title,
          articleId: rows[0].id,
          category: rows[0].category
        }
      });
    }
  }

  // eslint-disable-next-line consistent-return
  static async updateArticle(req, res) {
    const { title, article, category } = req.body;

    const sql = `UPDATE articles SET title = $1, 
    article = $2, category = $3 WHERE id = $4 RETURNING *`;

    const { rows } = await teamworkModel.query(
      sql,
      [
        (title && title.trim()) || req.article.title,
        (article && article.trim()) || req.article.article,
        (category && category.trim()) || req.article.category,
        req.params.id
      ],
      res
    );
    if (rows) {
      return res.status(200).json({
        status: 200,
        message: 'Article successfully edited',
        data: {
          title: rows[0].title,
          article: rows[0].article,
          category: rows[0].category
        }
      });
    }
  }

  static async deleteArticle(req, res) {
    const sql = `DELETE FROM articles WHERE id = $1`;
    await teamworkModel.query(sql, [req.params.id], res);

    return res.status(200).json({
      status: 200,
      message: 'Article successfully deleted'
    });
  }

  static async allArticles(req, res) {
    // eslint-disable-next-line consistent-return
    const sql = `SELECT * FROM articles ORDER BY publishedon DESC`;
    const { rows } = await teamworkModel.query(sql, [], res);

    const pageCount = Math.ceil(rows.length / 10);

    // eslint-disable-next-line prefer-const
    let currentPage = parseInt(req.query.page, 10);

    currentPage = (currentPage > pageCount
    ? pageCount
    : currentPage < 0)
      ? 1
      : currentPage;

    return res.status(200).json({
      status: 200,
      message: 'Success',
      count: rows.slice(currentPage * 10 - 10, currentPage * 10).length,
      currentPage,
      pageCount,
      data: rows.slice(currentPage * 10 - 10, currentPage * 10)
    });
  }

  static async getArticle(req, res) {
    let queryset;
    let sql;

    sql = `SELECT * FROM articles where id = $1`;
    queryset = await teamworkModel.query(sql, [req.params.id], res);
    const article = queryset.rows[0];

    sql = `SELECT * FROM comments where author = $1`;
    queryset = await teamworkModel.query(sql, [req.user.id], res);

    const comments = queryset.rows;

    return res.status(200).json({
      status: 200,
      data: {
        id: article.id,
        createdOn: new Moment(article.publishedOn).format('MMM-DD-Y HH:mm'),
        title: article.title,
        article: article.article,
        authorId: article.author,
        comments
      }
    });
  }

  static async findArticlesByCategory(req, res) {
    const { category } = req.query;

    const sql = `SELECT * FROM articles WHERE category = $1`;
    const { rows } = await teamworkModel.query(sql, [category], res);

    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        rows
      }
    });
  }
}

export default Article;
