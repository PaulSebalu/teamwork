import env from 'dotenv';
import express from 'express';

env.config();

const app = express();

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Teamwork REST API'
  });
});

app.use('*', (req, res) => {
  return res.status(405).json({
    status: 405,
    message: 'Invalid resource'
  });
});

let PORT;

if (process.env.NODE_ENV === 'test') {
  PORT = 3000;
} else {
  PORT = process.env.PORT || 2000;
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}...`);
});

module.exports = app;
