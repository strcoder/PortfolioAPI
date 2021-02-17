import 'dotenv/config';

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  cors: process.env.CORS || '*',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || '',
  dbName: process.env.DB_NAME || '',
  authJwtSecret: process.env.AUTH_JWT_SECRET || '',
  publicApiKeysToken: process.env.PUBLIC_API_KEYS_TOKEN || '',
  registerApiKeysToken: process.env.REGISTER_API_KEYS_TOKEN || '',
}
