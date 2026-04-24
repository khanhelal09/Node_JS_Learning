const express = require("express");
const router = express.Router();
const userControllerSequelize = require("../controllers/userControllerSequelize");
const { authenticateDeviceAPI } = require("../middleware/auth");
const {validateUserInfo, validateUserId} = require("../middleware/validation");

router.get("/users", authenticateDeviceAPI, userControllerSequelize.getAllUsers);
router.get("/users/:id", authenticateDeviceAPI, validateUserId, userControllerSequelize.getUserByID);
router.post("/users", authenticateDeviceAPI, validateUserInfo, userControllerSequelize.createUser);
router.put("/users/:id", authenticateDeviceAPI, validateUserId, validateUserInfo, userControllerSequelize.updateUser);
router.delete("/users/:id", authenticateDeviceAPI, validateUserId, userControllerSequelize.deleteUser);

module.exports = router;