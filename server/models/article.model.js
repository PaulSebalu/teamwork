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

  findArticle(id) {
    const article = articleDb.find(e => e.id === id);
    return article;
  }

  updateArticle(validatedData, articleId) {
    const article = articleDb.find(e => e.id === articleId);
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
}

export default new Article();
