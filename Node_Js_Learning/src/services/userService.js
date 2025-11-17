// const database = require("../config/database");

// class UserService {
//   async getAllUsers() {
//     try {
//       console.log("inside UserService getAllUsers ::::");
//       const query = `SELECT * FROM users`;
//       const rows = await database.myCustomQuery(query);
//       return rows;
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//       throw new Error("Failed to fetch user list");
//     }
//   }

//   async createUser(userData) {
//     try {
//       console.log("inside UserService createUser ::::");
//       console.log(
//         "UserService > createUser > userData::: " + JSON.stringify(userData)
//       );

//       const insertQuery = "INSERT INTO users (name, email) VALUES (?, ?)";

//       const savedUser = await database.myCustomQuery(insertQuery, [
//         userData.name,
//         userData.email,
//       ]);

//       console.log(
//         "UserService > createUser > rows: " + JSON.stringify(savedUser)
//       );
//       return savedUser;
//     } catch (error) {
//       console.error("Error to create new user:", error.message);
//       throw new Error("Failed to create new user");
//     }
//   }

//   async deleteUser(id) {
//     try {
//       console.log("UserService > deleteUser > id::: " + JSON.stringify(id));

//       const deleteQuery = `DELETE FROM users WHERE id=${id}`;
//       const result = await database.myCustomQuery(deleteQuery);

//       return result;
//     } catch (error) {
//       console.error("Error to delete user:", error.message);
//       throw new Error("Failed to delete user");
//     }
//   }
// }

// module.exports = new UserService();
