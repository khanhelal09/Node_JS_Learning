// const mysql = require("mysql2/promise");
// const config = require("../config/config");

// // Create the connection pool
// const connectionPool = mysql.createPool(config.DB);

// // Check if DB is connected
// async function isConnected() {
//   try {
//     await connectionPool.query("SELECT 1");
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

// // Create table if not exists
// (async () => {
//   try {
//     // SQL for creating table
//     const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
//   )`;

//     const createAddressTableQuery = `CREATE TABLE IF NOT EXISTS address (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     address VARCHAR(100) NOT NULL
//   )`;

//     await connectionPool.query(createTableQuery);
//     await connectionPool.query(createAddressTableQuery);
//     console.log("Tables created or already exists.");
//   } catch (err) {
//     console.error("Error creating table:", err);
//   }
// })();

// // Query helper functions
// async function myCustomQuery(sql, params) {
//   try {
//     const [rows] = await connectionPool.query(sql, params);
//     return rows;
//   } catch (err) {
//     console.error("Query error:", err);
//     throw err;
//   }
// }

// // const multiInsertQuery = 'INSERT INTO users (name, email) VALUES ?';
// // const users = [
// //   ['Bob', 'bob@example.com'],
// //   ['Carol', 'carol@example.com']
// // ];

// // Batch/multi-row insert, returns a Promise
// async function myCustomQueryBatch(sql, params) {
//   try {
//     const [results] = await connectionPool.query(sql, params);
//     return results;
//   } catch (err) {
//     console.error("Batch query error:", err);
//     throw err;
//   }
// }

// async function disconnectDatabase() {
//   try {
//     await connectionPool.end();
//     console.log("Database connection pool closed.");
//   } catch (err) {
//     console.error("Error closing database connection:", err);
//   }
// }

// module.exports = {
//   connectionPool,
//   myCustomQuery,
//   isConnected,
//   myCustomQueryBatch,
//   disconnectDatabase,
// };
