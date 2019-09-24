import articleModel from '../models/article.model';
import createArticleValidator from '../helpers/article.validator.helper';

class Article {
  static async CreateArticle(req, res) {
    const { error } = createArticleValidator(req.body);

    if (error)
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      });

    const newArticle = articleModel.createNewArticle(
      req.body,
      req.user.employeeId
    );

    const returnResponse = {
      status: 201,
      message: 'Article successfully created',
      data: {
        createdOn: newArticle.publishedOn,
        title: newArticle.title,
        author: newArticle.author
      }
    };
    return res.status(201).json(returnResponse);
  }
}

export default Article;
