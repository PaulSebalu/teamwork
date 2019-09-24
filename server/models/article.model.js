import moment from 'moment';
import articleDb from './articles.db';

class Article {
  createNewArticle(validatedData, authorId) {
    const { title, article } = validatedData;

    const newArticle = {
      id: articleDb.length + 1,
      title,
      article,
      publishedOn: moment().format('MMM-DD-Y::HH:mm'),
      author: authorId,
      inappropriateFlag: false,
      inappropriateFlagCount: 0
    };
    articleDb.push(newArticle);
    return newArticle;
  }

  allArticles() {
    const articles = articleDb;
    return articles;
  }
}

export default new Article();
