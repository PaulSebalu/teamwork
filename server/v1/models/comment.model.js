import moment from 'moment';
import commentDb from './comment.db';

class Comment {
  createNewComment(validatedData, articleId, employeeId) {
    const { comment } = validatedData;

    const newComment = {
      id: commentDb.length + 1,
      publishedOn: moment().format('MMM-DD-Y HH:mm'),
      article: articleId,
      comment,
      author: employeeId
    };
    commentDb.push(newComment);
    return newComment;
  }

  allComments() {
    return commentDb;
  }
}
export default new Comment();
