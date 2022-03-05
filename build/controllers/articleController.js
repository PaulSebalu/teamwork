"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var teamworkModel_1 = __importDefault(require("../models/teamworkModel"));
var Article = /** @class */ (function () {
    function Article() {
    }
    // eslint-disable-next-line consistent-return
    Article.CreateArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, article, category, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, article = _a.article, category = _a.category;
                        sql = "INSERT INTO articles\n    (title, article, category, publishedon, author, \n        flag, flagcount) \n      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [
                                title.trim(),
                                article.trim(),
                                (category && category.trim()) || '',
                                new Date(),
                                req.user.id,
                                false,
                                0
                            ], res)];
                    case 1:
                        rows = (_b.sent()).rows;
                        if (rows) {
                            return [2 /*return*/, res.status(201).json({
                                    status: 201,
                                    message: 'Article successfully created',
                                    data: {
                                        createdOn: new moment_1.default(rows[0].publishedon).format('MMM-DD-Y HH:mm'),
                                        title: rows[0].title,
                                        articleId: rows[0].id,
                                        category: rows[0].category
                                    }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line consistent-return
    Article.updateArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, article, category, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, article = _a.article, category = _a.category;
                        sql = "UPDATE articles SET title = $1, \n    article = $2, category = $3 WHERE id = $4 RETURNING *";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [
                                (title && title.trim()) || req.article.title,
                                (article && article.trim()) || req.article.article,
                                (category && category.trim()) || req.article.category,
                                req.params.id
                            ], res)];
                    case 1:
                        rows = (_b.sent()).rows;
                        if (rows) {
                            return [2 /*return*/, res.status(200).json({
                                    status: 200,
                                    message: 'Article successfully edited',
                                    data: {
                                        title: rows[0].title,
                                        article: rows[0].article,
                                        category: rows[0].category
                                    }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Article.deleteArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "DELETE FROM articles WHERE id = $1";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [req.params.id], res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                status: 200,
                                message: 'Article successfully deleted'
                            })];
                }
            });
        });
    };
    Article.allArticles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, pageCount, currentPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM articles ORDER BY publishedon DESC";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [], res)];
                    case 1:
                        rows = (_a.sent()).rows;
                        pageCount = Math.ceil(rows.length / 10);
                        currentPage = parseInt(req.query.page, 10);
                        currentPage = (currentPage > pageCount
                            ? pageCount
                            : currentPage < 0)
                            ? 1
                            : currentPage;
                        return [2 /*return*/, res.status(200).json({
                                status: 200,
                                message: 'Success',
                                count: rows.slice(currentPage * 10 - 10, currentPage * 10).length,
                                currentPage: currentPage,
                                pageCount: pageCount,
                                data: rows.slice(currentPage * 10 - 10, currentPage * 10)
                            })];
                }
            });
        });
    };
    Article.getArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var queryset, sql, article, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM articles where id = $1";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [req.params.id], res)];
                    case 1:
                        queryset = _a.sent();
                        article = queryset.rows[0];
                        sql = "SELECT * FROM comments where author = $1";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [req.user.id], res)];
                    case 2:
                        queryset = _a.sent();
                        comments = queryset.rows;
                        return [2 /*return*/, res.status(200).json({
                                status: 200,
                                data: {
                                    id: article.id,
                                    createdOn: new moment_1.default(article.publishedOn).format('MMM-DD-Y HH:mm'),
                                    title: article.title,
                                    article: article.article,
                                    authorId: article.author,
                                    comments: comments
                                }
                            })];
                }
            });
        });
    };
    Article.findArticlesByCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var category, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = req.query.category;
                        sql = "SELECT * FROM articles WHERE category = $1";
                        return [4 /*yield*/, teamworkModel_1.default.query(sql, [category], res)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, res.status(200).json({
                                status: 200,
                                message: 'Success',
                                data: {
                                    rows: rows
                                }
                            })];
                }
            });
        });
    };
    return Article;
}());
exports.default = Article;
//# sourceMappingURL=articleController.js.map