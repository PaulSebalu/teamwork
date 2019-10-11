/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Comment from '../controllers/comment.controller';
import verifyUser from '../middleware/authentication.middleware';

const CommentRouter = express.Router();

CommentRouter.use(json());

CommentRouter.post('/articles/:id/comments', verifyUser, Comment.createComment);

export default CommentRouter;
