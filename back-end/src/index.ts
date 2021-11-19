import { difference, isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { app } from './app';
import { MONGO_URI, PORT } from './utils/secrets';

const start = async () => {
  console.log('Auth services starting...');

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.info('Connected to mongo db!');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Can not connect to mongo db: ', error);
    process.exit();
  }
};

start();
