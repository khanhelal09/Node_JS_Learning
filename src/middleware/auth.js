const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_TYPE} = require("../config/constants");

/**
 * Device JWT access token authentication middleware for device-protected routes
 * Verifies device JWT access token generated from
 */
const authenticateDeviceAPI = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    //const refreshTokenFromHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No device token provided.",
        code: "NO_DEVICE_TOKEN",
      });
    }

    // Check if header starts with 'Bearer '
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Invalid token format. Use 'Bearer <token>'",
        code: "INVALID_TOKEN_FORMAT",
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Empty token provided.",
        code: "EMPTY_TOKEN",
      });
    }

    // Verify token
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET || "fallback_secret_key";
    const decoded = jwt.verify(token, secret);

    // Check if token is for device
    if (decoded.type !== ACCESS_TOKEN_TYPE) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Invalid token type. Expected device token.",
        code: "INVALID_TOKEN_TYPE",
      });
    }

    // const isExpired = Date.now() >= decoded.exp * 1000;
    // console.log("isAuthorizedUser >> isExpired:" + isExpired);
    // if (isExpired) {
    //   return res.status(401).json({
    //     success: false,
    //     error:
    //       "Access denied. Device token has expired. Please re-authenticate.",
    //     code: "DEVICE_TOKEN_EXPIRED",
    //   });
    // }

    req.tokenPayload = decoded;
    next();
  } catch (error) {
    console.error("Device authentication error:", error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Access denied. Invalid device token.",
        code: "INVALID_DEVICE_TOKEN",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error:
          "Access denied. Device token has expired. Please re-authenticate.",
        code: "DEVICE_TOKEN_EXPIRED",
      });
    }

    if (error.name === "NotBeforeError") {
      return res.status(401).json({
        success: false,
        error: "Access denied. Device token not yet valid.",
        code: "DEVICE_TOKEN_NOT_ACTIVE",
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      error: "Internal server error during device authentication.",
      code: "DEVICE_AUTH_ERROR",
    });
  }
};

module.exports = {
  authenticateDeviceAPI
};
