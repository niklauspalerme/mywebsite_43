require('dotenv').config();

module.exports = {
  apps: [{
    name: "api",
    script: "./index.js",
    watch: true,
    env_local: {
      "NODE_ENV": "local",
      "API_DESCRIPTION": "Estás ejecutando tu API en modo desarrollador.",
      "DB_HOST": process.env.DB_HOST,
      "DB_USER": process.env.DB_USER,
      "DB_PASS": process.env.DB_PASS,
      "MONGO_URL": process.env.MONGO_URL,
      "REDIS_ENDPOINT": process.env.REDIS_ENDPOINT,
      "CACHE_EX": process.env.CACHE_EX
    },
    env_production: {
      "NODE_ENV": "production",
      "API_DESCRIPTION": "Estás ejecutando tu API en producción. ¡¡Ten cuidado!!",
      "DB_HOST": process.env.DB_HOST,
      "DB_USER": process.env.DB_USER,
      "DB_PASS": process.env.DB_PASS,
      "MONGO_URL": process.env.MONGO_URL,
      "REDIS_ENDPOINT": process.env.REDIS_ENDPOINT,
      "CACHE_EX": process.env.CACHE_EX
    }
  }]
};
