const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {sequelize} = require("./config/dbSequelize");

// Import routes
const securityRoute = require("./routes/securityRoute");
const userRouteSequelize = require("./routes/userRouteSequelize");
const healthRoutes = require("./routes/healthRoutes");

// Import middleware
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

const app = express();

// Security middleware - should be first
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // For Swagger UI
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false, // For API compatibility
  })
);

// CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Enable CORS (only allow specific origin)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, "../public")));

// Custom middleware
//Express automatically calls logger function for every incoming request, don’t need to call it manually.
app.use(logger); // logs every incoming HTTP request to both console and A daily log file in your nodeLearningLogs/ folder.

// Rate limiting (e.g. max 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: { message: "Too many requests, please try again later." },
});

app.use(limiter);

// Routes define
app.use("/node-learning/health", healthRoutes);
app.use("/node-learning/security", securityRoute);
app.use("/node-learning/api", userRouteSequelize);

// Database Sync, below block is needed for sequelize no need for MySQL
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Sync error:", error);
  }
})();

// Catch-all unmatched routes (404 errors) by this handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global Error handler. Should be the last middleware!
app.use(errorHandler);

module.exports = app;
