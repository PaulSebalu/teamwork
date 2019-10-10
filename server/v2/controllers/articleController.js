import pool from '../services/connectDb';

class Article {
  // eslint-disable-next-line consistent-return
  static async CreateArticle(req, res) {
    const { title, article, category } = req.body;
    const query = `INSERT INTO articles
    (title, article, category, publishedon, author, 
        flag, flagcount) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    pool.query(
      query,
      [
        title,
        article,
        (category && category.trim()) || '',
        new Date(),
        req.user.id,
        false,
        0
      ],
      (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        return res.status(201).json({
          status: 201,
          message: 'Article successfully created',
          data: {
            createdOn: results.rows[0].publishedon,
            title: results.rows[0].title,
            articleId: results.rows[0].id,
            category: results.rows[0].category
          }
        });
      }
    );
  }

  // eslint-disable-next-line consistent-return
  static updateArticle(req, res) {
    const { title, article, category } = req.body;

    pool.query(
      'UPDATE articles SET title = $1, article = $2, category = $3 WHERE id = $4 RETURNING *',
      [
        title || req.article.title,
        article || req.article.article,
        category || req.article.category,
        req.params.id
      ],
      (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'Article successfully edited',
          data: {
            title: results.rows[0].title,
            article: results.rows[0].article,
            category: results.rows[0].category
          }
        });
      }
    );
  }

  static deleteArticle(req, res) {
    pool.query('DELETE FROM articles WHERE id = $1', [req.params.id], err => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.detail
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Article successfully deleted'
      });
    });
  }

  static allArticles(req, res) {
    // eslint-disable-next-line consistent-return
    pool.query(
      'SELECT * FROM articles ORDER BY publishedon DESC',
      (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        const pageCount = Math.ceil(results.rows.length / 10);
        if (req.query.page === 'all') {
          return res.status(200).json({
            status: 200,
            message: 'Success',
            count: results.rows.length,
            page: 'N/A',
            pageCount: 'N/A',
            data: results.rows
          });
        }
        let page = parseInt(req.query.page, 10);
        if (!page) {
          page = 1;
        }
        if (page > pageCount) {
          page = pageCount;
        }
        return res.status(200).json({
          status: 200,
          message: 'Success',
          count: results.rows.slice(page * 10 - 10, page * 10).length,
          page,
          pageCount,
          data: results.rows.slice(page * 10 - 10, page * 10)
        });
      }
    );
  }

  static getArticle(req, res) {
    pool.query(
      'SELECT * FROM articles where id = $1',
      [req.params.id],
      (err, articles) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        return res.status(200).json({
          status: 200,
          data: {
            id: articles.rows[0].id,
            createdOn: articles.rows[0].publishedOn,
            title: articles.rows[0].title,
            article: articles.rows[0].article,
            authorId: articles.rows[0].author
          }
        });
      }
    );
  }

  static findArticlesByCategory(req, res) {
    const { category } = req.query;
    pool.query(
      'SELECT * FROM articles WHERE category = $1',
      [category],
      (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        const articles = results.rows;
        return res.status(200).json({
          status: 200,
          message: 'Success',
          data: {
            articles
          }
        });
      }
    );
  }
}

export default Article;
