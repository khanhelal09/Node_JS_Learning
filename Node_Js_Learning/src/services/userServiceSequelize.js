const User = require("../models/Users");

class UserServiceSequelize {
  async getAllUsers() {
    try {
      console.log("UserServiceSequelize getAllUsers ::::");
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw new Error("Failed to fetch user list");
    }
  }

  async getUserByID(id) {
    try {
      console.log("UserServiceSequelize getUserByID id:: " + id);
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw new Error("Failed to fetch user list");
    }
  }

  async createUser(name, email) {
    try {
      const savedUser = await User.create({ name, email });
      console.log(
        "UserServiceSequelize > createUser > savedUser: " +
          JSON.stringify(savedUser)
      );
      return savedUser;
    } catch (error) {
      console.error("Error to create new user:", error.message);
      throw new Error("Failed to create new user");
    }
  }

  async updateUser(id, name, email) {
    try {
      const [updatedUser] = await User.update(
        { name, email },
        { where: { id: id } }
      );
      console.log(
        "UserServiceSequelize > createUser > savedUser: " +
          JSON.stringify(updatedUser)
      );
      return updatedUser;
    } catch (error) {
      console.error("Error to update user:", error.message);
      throw new Error("Failed to Update new user");
    }
  }

  async deleteUser(id) {
    try {
      console.log(
        "UserServiceSequelize > deleteUser > id::: " + JSON.stringify(id)
      );
      const deleted = await User.destroy({ where: { id: id } });
      return deleted;
    } catch (error) {
      console.error("Error to delete user:", error.message);
      throw new Error("Failed to delete user");
    }
  }
}

module.exports = new UserServiceSequelize();
