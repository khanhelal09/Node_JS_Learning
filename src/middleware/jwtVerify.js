// Protected Route using JWT
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "fallback_secret_key";

const jwtVerification = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).send("Token missing");

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).send("Invalid Token");
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("jwtVerify > jwtVerification error:::", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error during device authentication.",
      code: "DEVICE_AUTH_ERROR",
    });
  }
};

module.exports = {
  jwtVerification,
};
