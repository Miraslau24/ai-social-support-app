import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: ['http://localhost:5173/'],
  MONGODB_URI: process.env.MONGO_URI,
  LOG_LEVEL: process.env.LOG_LEVEL,
  OPEN_AI_KEY: process.env.OPEN_AI_KEY,
  API_MODEL: process.env.API_MODEL || 'gpt-5',
  API_URL: process.env.API_URL || '',
};

export default config;
