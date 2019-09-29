/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Article from '../controllers/article.controller';
import verifyUser from '../middleware/authentication.middleware';
import verifyAuthor from '../middleware/authorization.middleware';

const ArticleRouter = express.Router();

ArticleRouter.use(json());

ArticleRouter.post('/api/v1/article/create', verifyUser, Article.CreateArticle);

ArticleRouter.patch(
  '/api/v1/article/update/:id',
  verifyUser,
  verifyAuthor,
  Article.updateArticle
);

ArticleRouter.delete(
  '/api/v1/article/delete/:id',
  verifyUser,
  verifyAuthor,
  Article.deleteArticle
);

ArticleRouter.get('/api/v1/feeds', verifyUser, Article.allArticles);

ArticleRouter.get('/api/v1/article/:id', verifyUser, Article.getArticle);

export default ArticleRouter;
