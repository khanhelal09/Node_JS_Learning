const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("NodeLearning", "root", "root@5word", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable SQL logging
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected using Sequelize!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Check MySQL connection
async function isConnected() {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
}

async function disconnectDatabase() {
  try {
    await sequelize.close();
    console.log("Database disconnected successfully.");
  } catch (err) {
    console.error("Error disconnecting database:", err);
  }
}

module.exports = { sequelize, isConnected, disconnectDatabase };
