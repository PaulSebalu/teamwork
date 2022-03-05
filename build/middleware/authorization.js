"use strict";
/* eslint-disable consistent-return */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeArticleDeletion = exports.authorizeArticleEdit = void 0;
var authorizeArticleEdit = function (req, res, next) {
    if (req.method === 'PATCH' && req.article.author !== req.user.id) {
        return res.status(403).json({
            status: 403,
            message: 'Forbidden: You cannot edit an article you did not author'
        });
    }
    next();
};
exports.authorizeArticleEdit = authorizeArticleEdit;
var authorizeArticleDeletion = function (req, res, next) {
    if (req.method === 'DELETE' && req.article.author !== req.user.id) {
        return res.status(403).json({
            status: 403,
            message: 'Forbidden: You cannot delete an article you did not author'
        });
    }
    next();
};
exports.authorizeArticleDeletion = authorizeArticleDeletion;
//# sourceMappingURL=authorization.js.map