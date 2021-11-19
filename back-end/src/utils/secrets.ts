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
export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI ?? '';
