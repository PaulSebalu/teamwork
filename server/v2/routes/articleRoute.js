/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Article from '../controllers/articleController';
import Comment from '../controllers/commentController';
import { tokenProvided, verifyUser } from '../middleware/authentication';
import articleExists from '../middleware/articleMiddleware';
import {
  authorizeArticleEdit,
  authorizeArticleDeletion
} from '../middleware/authorization';
import {
  createArticleValidator,
  updateArticleValidator,
  commentValidator
} from '../middleware/validators';

const ArticleRouter = express.Router();

ArticleRouter.use(json());

ArticleRouter.post(
  '/articles',
  tokenProvided,
  verifyUser,
  createArticleValidator,
  Article.CreateArticle
);

ArticleRouter.patch(
  '/articles/:id',
  tokenProvided,
  verifyUser,
  articleExists,
  authorizeArticleEdit,
  updateArticleValidator,
  Article.updateArticle
);

ArticleRouter.delete(
  '/articles/:id',
  tokenProvided,
  verifyUser,
  articleExists,
  authorizeArticleDeletion,
  Article.deleteArticle
);

ArticleRouter.get('/feeds', Article.allArticles);

ArticleRouter.get(
  '/articles/:id',
  tokenProvided,
  verifyUser,
  articleExists,
  Article.getArticle
);

ArticleRouter.get(
  '/articles/category',
  tokenProvided,
  verifyUser,
  Article.findArticlesByCategory
);

ArticleRouter.post(
  '/articles/:id/comments',
  tokenProvided,
  verifyUser,
  articleExists,
  commentValidator,
  Comment.createComment
);

export default ArticleRouter;
