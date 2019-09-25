/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Article from '../controllers/article.controller';
import verifyUser from '../middleware/authentication.middleware';

const ArticleRouter = express.Router();

ArticleRouter.use(json());

ArticleRouter.post('/api/v1/article/create', verifyUser, Article.CreateArticle);

ArticleRouter.patch(
  '/api/v1/article/update/:id',
  verifyUser,
  Article.updateArticle
);

export default ArticleRouter;
