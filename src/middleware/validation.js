const { body, param, validationResult } = require("express-validator");

const validateUserInfo = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3–20 characters long")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can contain only letters, numbers, underscores, and hyphens"
    ),

  body("networkQuality")
    .optional() //The field networkQuality is optional.
    .isIn(["Poor", "Fair", "Good", "Excellent", "Unknown"])
    .withMessage("Invalid network quality"),
];

// Validation for device ID parameter
const validateUserId = [
  param("id") //id INT AUTO_INCREMENT PRIMARY KEY
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
];

// Middleware to check validation results
const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array({ onlyFirstError: true }), //show only first error per field
    });
  }
  next();
};

module.exports = {
  validateUserInfo: [...validateUserInfo, checkValidationResult],
  validateUserId: [...validateUserId, checkValidationResult],
};
