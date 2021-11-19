import fs from 'fs';
import dotenv from 'dotenv';

// loads environment variables from a .env file into process.env
if (fs.existsSync('.env')) {
  console.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.debug('No use .env file to supply config environment variables');
}

export const PORT = process.env.PORT ?? 3000;
export const APP_DOMAIN = process.env.APP_DOMAIN ?? '';
export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI ?? '';
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN ?? '';
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET ?? '';
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID ?? '';
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE ?? '';
export const AUTH0_MANAGEMENT_AUDIENCE = process.env.AUTH0_MANAGEMENT_AUDIENCE ?? '';
export const AUTH0_CONNECTION = process.env.AUTH0_CONNECTION ?? '';
export const AUTH0_KEY_SET_URI = process.env.AUTH0_KEY_SET_URI ?? '';
export const AUTH0_TRIAL_ROLE_ID = process.env.AUTH0_TRIAL_ROLE_ID ?? '';

export const AUTH_SECRET = process.env.AUTH_SECRET ?? '';
// if (!AUTH_SECRET) {
//   console.error('No auth secret string!');
//   process.exit();
// }

export const AUTH_ALGORITHM = process.env.AUTH_ALGORITHM ?? '';
// if (!AUTH_ALGORITHM) {
//   console.error('No auth algorithm string!');
//   process.exit();
// }

export const AUTH_AUDIENCE = process.env.AUTH_AUDIENCE ?? '';
// if (!AUTH_AUDIENCE) {
//   console.error('No auth audience string!');
//   process.exit();
// }

export const AUTH_EXPIRES_IN = process.env.AUTH_EXPIRES_IN ?? '';
// if (!AUTH_EXPIRES_IN) {
//   console.error('No auth expire info!');
//   process.exit();
// }

if (!APP_DOMAIN) {
  console.error('No app domain string!');
  process.exit();
}

if (!MONGO_URI) {
  console.error('No mongo connection string!');
  process.exit();
}

if (
  !(
    AUTH0_CLIENT_SECRET &&
    AUTH0_DOMAIN &&
    AUTH0_CLIENT_ID &&
    AUTH0_AUDIENCE &&
    AUTH0_CONNECTION &&
    AUTH0_KEY_SET_URI &&
    AUTH0_TRIAL_ROLE_ID &&
    AUTH0_MANAGEMENT_AUDIENCE
  )
) {
  console.error('No auth0 variable!');
  process.exit();
}
