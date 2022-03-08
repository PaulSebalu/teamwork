import express, {json} from 'express';
import { envConfig } from './core/utils';

import AuthRoute from './account/route';

envConfig();

const app = express();
app.use(json())

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Teamwork REST API'
  });
});

// app routes

app.use(AuthRoute);

app.use('*', (req, res) => {
  return res.status(405).json({
    status: 405,
    message: 'Invalid resource'
  });
});

let PORT: number | string;

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
