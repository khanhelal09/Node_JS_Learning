const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE, ISSUER, AUDIENCE} = require("../config/constants");

class SecurityService {
  // Generate Access and Refresh Tokens
  async getAccessAndRefreshToken() {
    try {
      // Generate short-lived JWT access token (15 minutes)
      const payloadAccessToken = {
        appInfoId: "id",
        appName: "appName",
        version: "version",
        //libraryToken: apptoken,
      };
      const jwtAccessToken =
        this.generateAccessTokenForDevice(payloadAccessToken);

      // Generate long-lived JWT refresh token (7d)
      const payloadRefreshToken = {
        appInfoId: "id",
        appName: "appName",
        version: "version",
        //jwtAccessToken,
      };
      const jwtRefreshToken = this.generateRefreshToken(payloadRefreshToken);

      return {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      };
    } catch (error) {
      console.error(
        "SecurityService > getAccessAndRefreshToken:",
        error.message
      );
      throw new Error("Failed to fetch getAccessAndRefreshToken");
    }
  }

  // Generate Access token From Refresh Tokens
  async reGenerateAccessTokenFromRefreshToken(refreshToken) {
    try {
      const secret =
        process.env.JWT_REFRESH_TOKEN_SECRET || "fallback_secret_key";
      const decoded = jwt.verify(refreshToken, secret);

      if (decoded.type !== REFRESH_TOKEN_TYPE) {
        throw new Error("Invalid token type");
      }

      // Generate new short-lived JWT access token (15 minutes)
      const payload = {
        appInfoId: decoded.appInfoId,
        appName: decoded.appName,
        version: decoded.version,
      };
      const newJwtAccessToken = this.generateAccessTokenForDevice(payload);

      return {
        message: "New access token generated successfully",
        accessToken: newJwtAccessToken,
      };
    } catch (error) {
      console.error("SecurityService reGenerateAccessTokenFromRefreshToken::", error);
      throw new Error("Invalid or expired refresh token");
    }
  }

  /**
   * Generate short-lived JWT access token for device
   * @param {Object} payload - Token payload
   * @returns {string} - JWT access token
   */
  generateAccessTokenForDevice(payload) {
    const tokenPayload = {
      ...payload,
      type: ACCESS_TOKEN_TYPE,
      iat: Math.floor(Date.now() / 1000),
    };

    const secret = process.env.JWT_ACCESS_TOKEN_SECRET || "fallback_secret_key";
    const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "5m";
    const options = {
      expiresIn: expiresIn,
      issuer: ISSUER,
      audience: AUDIENCE,
    };

    return jwt.sign(tokenPayload, secret, options);
  }

  /**
   * Generate long-lived JWT refresh token for device
   * @param {Object} payload - Token payload
   * @returns {string} - JWT refresh token
   */
  generateRefreshToken(payload) {
    const tokenPayload = {
      ...payload,
      type: REFRESH_TOKEN_TYPE,
      iat: Math.floor(Date.now() / 1000),
    };

    const secret =
      process.env.JWT_REFRESH_TOKEN_SECRET || "fallback_secret_key";
    const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d";
    const options = {
      expiresIn: expiresIn,
      issuer: ISSUER,
      audience: AUDIENCE,
    };

    return jwt.sign(tokenPayload, secret, options);
  }
}

module.exports = new SecurityService();
