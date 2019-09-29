"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _employee = _interopRequireDefault(require("./server/routes/employee.route"));

var _article = _interopRequireDefault(require("./server/routes/article.route"));

var _comment = _interopRequireDefault(require("./server/routes/comment.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_employee["default"]);
app.use(_article["default"]);
app.use(_comment["default"]);
app.get('/', function (req, res) {
  res.send({
    status: 200,
    message: 'Teamwork API'
  });
});
app.use('*', function (req, res) {
  return res.status(405).json({
    status: 405,
    message: 'Method not allowed'
  });
});
var PORT = process.env.PORT || 2000;
app.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log("Server started on port ".concat(PORT, "..."));
});
module.exports = app;