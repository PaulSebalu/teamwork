import express from 'express';
import bodyParser from 'body-parser';

import employeeRouter from './server/routes/registration.route';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(employeeRouter);

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Teamwork API'
  });
});

app.use('*', (req, res) => {
  return res.status(405).json({
    status: 405,
    message: 'Method not allowed'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}...`);
});

module.exports = app;
