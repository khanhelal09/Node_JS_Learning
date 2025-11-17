const userService = require("../services/userServiceSequelize");

class UserControllerSequelize {
  // Get all user records
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      console.error("UserControllerSequelize > getAllUsers:", error.message);
      // Pass error to globla error handler middleware
      next(error);
    }
  }

  // Get user records by ID
  async getUserByID(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userService.getUserByID(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      console.error("UserController > getUserByID:", error.message);
      // Pass error to globla error handler middleware
      next(error);
    }
  }

  // Create new User
  async createUser(req, res, next) {
    try {
      const { name, email } = req.body;
      const savedUser = await userService.createUser(name, email);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
    } catch (error) {
      console.error("UserControllerSequelize > createUser:", error.message);
      // Pass error to globla error handler middleware
      next(error);
    }
  }

  // Update User
  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const { name, email } = req.body;
      const updatedUser = await userService.updateUser(id, name, email);

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "User updated successfully" });
    } catch (error) {
      console.error("UserControllerSequelize > createUser:", error.message);
      // Pass error to globla error handler middleware
      next(error);
    }
  }

  // Delete User
  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const deleted = await userService.deleteUser(id);
      // if (!deleted.affectedRows) {
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "User information not found",
        });
      }

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("UserControllerSequelize > deleteUser:", error.message);
      // Pass error to globla error handler middleware
      next(error);
    }
  }
}

module.exports = new UserControllerSequelize();
