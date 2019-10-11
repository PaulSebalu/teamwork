import commentModel from '../models/comment.model';
import articleModel from '../models/article.model';
import createCommentValidator from '../helpers/comment.validator.helper';
import exceptionHandler from '../helpers/exception.helper';

class Comment {
  static async createComment(req, res) {
    const { error } = createCommentValidator(req.body);

    if (error) {
      return exceptionHandler(res, error);
    }
    const article = articleModel.findArticle(parseInt(req.params.id, 10));

    const employeeId = req.user.id;

    const newComment = commentModel.createNewComment(
      req.body,
      article.id,
      employeeId
    );

    return res.status(201).json({
      status: 201,
      message: 'Comment successfully created',
      data: {
        createdOn: newComment.publishedOn,
        articleTitle: article.title,
        article: article.article,
        comment: newComment.comment,
        commentAuthor: newComment.author
      }
    });
  }
}

export default Comment;
