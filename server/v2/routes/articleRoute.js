/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Article from '../controllers/articleController';
import Comment from '../controllers/commentController';
import { tokenProvided, verifyUser } from '../middleware/authentication';
import articleExists from '../middleware/articleMiddleware';
import verifyAuthor from '../middleware/authorization';
import {
  createArticleValidator,
  updateArticleValidator,
  commentValidator
} from '../middleware/validators';

const ArticleRouter = express.Router();

ArticleRouter.use(json());

ArticleRouter.post(
  '/api/v2/article/create',
  tokenProvided,
  verifyUser,
  createArticleValidator,
  Article.CreateArticle
);

ArticleRouter.patch(
  '/api/v2/article/update/:id',
  tokenProvided,
  verifyUser,
  articleExists,
  verifyAuthor,
  updateArticleValidator,
  Article.updateArticle
);

ArticleRouter.delete(
  '/api/v2/article/delete/:id',
  tokenProvided,
  verifyUser,
  articleExists,
  verifyAuthor,
  Article.deleteArticle
);

ArticleRouter.get(
  '/api/v2/feeds',
  tokenProvided,
  verifyUser,
  Article.allArticles
);

ArticleRouter.get(
  '/api/v2/article/:id',
  tokenProvided,
  verifyUser,
  articleExists,
  Article.getArticle
);

ArticleRouter.get(
  '/api/v2/search',
  tokenProvided,
  verifyUser,
  Article.findArticlesByCategory
);

ArticleRouter.post(
  '/api/v2/article/:id/comments',
  tokenProvided,
  verifyUser,
  articleExists,
  commentValidator,
  Comment.createComment
);

export default ArticleRouter;
