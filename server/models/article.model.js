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
    return articleDb;
  }

  findArticle(id) {
    const article = articleDb.find(a => a.id === id);
    return article;
  }

  updateArticle(validatedData, articleId) {
    const article = articleDb.find(a => a.id === articleId);
    const updatedArticle = {
      id: article.id,
      title: validatedData.title || article.title,
      article: validatedData.article || article.article,
      publishedOn: article.publishedOn,
      author: article.author,
      inappropriateFlag: article.inappropriateFlag,
      inappropriateFlagCount: article.inappropriateFlagCount
    };
    articleDb.splice(articleDb.indexOf(article), 1, updatedArticle);
    return updatedArticle;
  }

  deleteArticle(articleId) {
    const article = articleDb.find(a => a.id === articleId);
    articleDb.splice(articleDb.indexOf(article), 1);
  }
}

export default new Article();
