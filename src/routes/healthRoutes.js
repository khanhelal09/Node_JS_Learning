const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

// GET /health - Basic health check
router.get("/basic", healthController.getHealth);
// GET /health/system - Detailed system information
router.get("/system", healthController.getSystemInfo);

module.exports = router;
