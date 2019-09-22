'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import employeeRouter from './server/routes/registration.route';

var app = (0, _express2.default)();
//add body parser as middleware for all requests
app.use(_bodyParser2.default.json());

app.use(_express2.default.urlencoded({ extended: false }));
app.use(_express2.default.json());
// app.use(employeeRouter);

//define routes
app.get('/', function (req, res) {
  res.send({
    message: 'Teamwork API'
  });
});

//attach router as a middleware
// app.use(routes);

module.exports = app;

// "test": "mocha --compilers js:babel-register",