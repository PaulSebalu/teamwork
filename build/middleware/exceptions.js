"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line consistent-return
var exceptionHandler = function (validator, res, next) {
    var error = validator.error;
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(/"/g, '')
        });
    }
    next();
};
exports.default = exceptionHandler;
//# sourceMappingURL=exceptions.js.map