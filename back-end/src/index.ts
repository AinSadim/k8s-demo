import { difference, isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { app } from './app';
import { permissions } from './constant/auth0';
import { Auth0 } from './services/auth0';
import { MONGO_URI, PORT } from './utils/secrets';

async function syncPermission() {
  let scopes = (await Auth0.shared.getLotoResourceServer()).scopes ?? [];
  const addedPermissions = scopes.map((s) => s.value);
  const permissionsNeedAdd = difference(permissions, addedPermissions);

  if (isEmpty(permissionsNeedAdd)) return;

  // * Add missing permissions
  scopes = scopes.concat(permissionsNeedAdd.map((p) => ({ value: p, description: p })));
  console.info('Add missing permissions', permissionsNeedAdd);
  await Auth0.shared.updateLotoPermissions(scopes);
  console.info('Add missing permissions successful');
}

const start = async () => {
  console.log('Auth services starting...');

  // * Synchronize permissions
  syncPermission().catch();

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
