import moment from 'moment';
import lodash from 'lodash';
import articleModel from '../models/article.model';
import createArticleValidator from '../helpers/article.validator.helper';
import exceptionHandler from '../helpers/exception.helper';
import commentModel from '../models/comment.model';
import updateArticleValidator from '../helpers/article.update.validator';

class Article {
  static async CreateArticle(req, res) {
    const { error } = createArticleValidator(req.body);

    if (error) {
      return exceptionHandler(res, error);
    }

    const newArticle = articleModel.createNewArticle(req.body, req.user.id);

    return res.status(201).json({
      status: 201,
      message: 'Article successfully created',
      data: {
        createdOn: newArticle.publishedOn,
        title: newArticle.title,
        articleId: newArticle.id,
        category: newArticle.category
      }
    });
  }

  static updateArticle(req, res) {
    const { error } = updateArticleValidator(req.body);

    if (error) {
      return exceptionHandler(res, error);
    }
    const updatedArticle = articleModel.updateArticle(
      req.body,
      parseInt(req.params.id, 10)
    );
    return res.status(200).json({
      status: 200,
      message: 'Article successfully edited',
      data: {
        title: updatedArticle.title,
        article: updatedArticle.article,
        category: updatedArticle.category
      }
    });
  }

  static deleteArticle(req, res) {
    articleModel.deleteArticle(parseInt(req.params.id, 10));
    return res.status(200).json({
      status: 200,
      message: 'Article successfully deleted'
    });
  }

  static allArticles(req, res) {
    const allArticles = articleModel.allArticles();
    if (!allArticles) {
      return res.status(200).json({
        status: 200,
        message: 'No articles available'
      });
    }

    const articles = lodash.orderBy(
      allArticles,
      function iteratee(article) {
        const dateTime = new Date(article.publishedOn);
        // eslint-disable-next-line new-cap
        return moment(dateTime).format('MMM-DD-Y HH:mm');
      },
      ['desc']
    );
    const pageCount = Math.ceil(articles.length / 10);
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
      count: articles.length,
      page,
      pageCount,
      data: articles.slice(page * 10 - 10, page * 10)
    });
  }

  static getArticle(req, res) {
    const article = articleModel.findArticle(parseInt(req.params.id, 10));

    const allComments = commentModel.allComments();

    const comments = lodash.filter(allComments, ['article', article.id]);

    return res.status(200).json({
      status: 200,
      data: {
        id: article.id,
        createdOn: article.publishedOn,
        title: article.title,
        article: article.article,
        authorId: article.author,
        comments
      }
    });
  }

  static findArticlesByCategory(req, res) {
    const { category } = req.query;
    const allArticles = articleModel.allArticles();
    const matchedArticles = allArticles.filter(
      article => article.category === category
    );
    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        matchedArticles
      }
    });
  }
}

export default Article;
