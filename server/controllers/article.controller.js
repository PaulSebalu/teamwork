import articleModel from '../models/article.model';
import createArticleValidator from '../helpers/article.validator.helper';
import exceptionHandler from '../helpers/exception.helper';

class Article {
  static async CreateArticle(req, res) {
    const { error } = createArticleValidator(req.body);

    if (error) {
      return exceptionHandler(res, error);
    }

    const newArticle = articleModel.createNewArticle(
      req.body,
      req.user.employeeId
    );

    return res.status(201).json({
      status: 201,
      message: 'Article successfully created',
      data: {
        createdOn: newArticle.publishedOn,
        title: newArticle.title,
        articleId: newArticle.id
      }
    });
  }

  static async updateArticle(req, res) {
    const article = articleModel.findArticle(parseInt(req.params.id, 10));
    if (article === undefined) {
      return res.status(404).json({
        status: 404,
        message: `An article with the unique id: ${req.params.id} does not exist`
      });
    }
    const { error } = createArticleValidator(req.body);

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
        article: updatedArticle.article
      }
    });
  }
}

export default Article;
