"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-duplicates */
var express_1 = __importDefault(require("express"));
var express_2 = __importDefault(require("express"));
var articleController_1 = __importDefault(require("../controllers/articleController"));
var commentController_1 = __importDefault(require("../controllers/commentController"));
var authentication_1 = require("../middleware/authentication");
var articleMiddleware_1 = __importDefault(require("../middleware/articleMiddleware"));
var authorization_1 = require("../middleware/authorization");
var validators_1 = require("../middleware/validators");
var ArticleRouter = express_1.default.Router();
ArticleRouter.use((0, express_2.default)());
ArticleRouter.post('/articles', authentication_1.tokenProvided, authentication_1.verifyUser, validators_1.createArticleValidator, articleController_1.default.CreateArticle);
ArticleRouter.patch('/articles/:id', authentication_1.tokenProvided, authentication_1.verifyUser, articleMiddleware_1.default, authorization_1.authorizeArticleEdit, validators_1.updateArticleValidator, articleController_1.default.updateArticle);
ArticleRouter.delete('/articles/:id', authentication_1.tokenProvided, authentication_1.verifyUser, articleMiddleware_1.default, authorization_1.authorizeArticleDeletion, articleController_1.default.deleteArticle);
ArticleRouter.get('/feeds', authentication_1.tokenProvided, authentication_1.verifyUser, articleController_1.default.allArticles);
ArticleRouter.get('/articles/:id', authentication_1.tokenProvided, authentication_1.verifyUser, articleMiddleware_1.default, articleController_1.default.getArticle);
ArticleRouter.get('/articles/category', authentication_1.tokenProvided, authentication_1.verifyUser, articleController_1.default.findArticlesByCategory);
ArticleRouter.post('/articles/:id/comments', authentication_1.tokenProvided, authentication_1.verifyUser, articleMiddleware_1.default, validators_1.commentValidator, commentController_1.default.createComment);
exports.default = ArticleRouter;
//# sourceMappingURL=articleRoute.js.map