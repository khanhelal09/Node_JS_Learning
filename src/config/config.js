const config = {
  PORT: process.env.PORT || 2000,
  // Database configuration
  DB: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root@5word",
    database: process.env.DB_NAME || "NodeLearning",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
};

module.exports = config;
