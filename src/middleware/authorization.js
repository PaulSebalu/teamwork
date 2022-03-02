/* eslint-disable consistent-return */

const authorizeArticleEdit = (req, res, next) => {
  if (req.method === 'PATCH' && req.article.author !== req.user.id) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden: You cannot edit an article you did not author'
    });
  }
  next();
};

const authorizeArticleDeletion = (req, res, next) => {
  if (req.method === 'DELETE' && req.article.author !== req.user.id) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden: You cannot delete an article you did not author'
    });
  }
  next();
};

export { authorizeArticleEdit, authorizeArticleDeletion };
