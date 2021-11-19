import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import morgan from 'morgan';
import { User } from './User';

const app = express();

app.use(morgan('combined'));
app.set('trust proxy', true);
app.use(json());

app.get('/api/users', async (req, res) => {
  res.send(await User.find());
});

app.all('*', async () => {
  throw new Error('404');
});

export { app };
