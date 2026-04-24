const database = require("../config/dbSequelize");

class HealthController {
  // Basic health check
  async getHealth(req, res) {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || "development",
      database: {
        connected: await database.isConnected()
      },
    });
  }

  // Detailed system info
  async getSystemInfo(req, res) {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        pid: process.pid,
      },
      database: {
        connected: await database.isConnected(),
        type: "mySQL",
      },
      application: {
        name: "Node js Learning API",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
      },
    });
  }
}

module.exports = new HealthController();
