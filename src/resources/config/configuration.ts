export default () => ({
  loggerLevel: process.env.LOGGER_LEVEL || 'info',
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  cache: {
    host: process.env.CACHE_HOST,
    port: parseInt(process.env.CACHE_PORT, 10) || 6379,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 10000,
    timeout: parseInt(process.env.CACHE_TIMEOUT, 10) || 10000,
  },
});
