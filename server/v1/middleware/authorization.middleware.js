/* eslint-disable consistent-return */
import articleModel from '../models/article.model';

const employeeAuthoredArticle = (req, res, next) => {
  if (articleModel.findArticle(parseInt(req.params.id, 10)) === undefined) {
    return res.status(404).json({
      status: 404,
      message: `An article with the unique id: ${req.params.id} does not exist`
    });
  }
  if (
    req.method === 'PATCH' &&
    articleModel.findArticle(parseInt(req.params.id, 10)).author !== req.user.id
  ) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden: You cannot edit an article you did not author'
    });
  }
  if (
    req.method === 'DELETE' &&
    articleModel.findArticle(parseInt(req.params.id, 10)).author !== req.user.id
  ) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden: You cannot delete an article you did not author'
    });
  }
  next();
};

export default employeeAuthoredArticle;
