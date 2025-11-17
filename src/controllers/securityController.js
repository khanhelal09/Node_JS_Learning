const securityService = require("../services/securityService");

class SecurityController {
  // Get access token and refresh token
  async getTokens(req, res, next) {
    try {
      const tokens = await securityService.getAccessAndRefreshToken();
      res.json({
        success: true,
        tokens: tokens,
      });
    } catch (error) {
      console.error("SecurityController > getTokens:", error.message);
      //next(error);
      
      // Instead of Global error handler, using custom generic error
      return res.status(500).json({
        success: false,
        error: "Error occured during access token generation.",
        code: "ACCESS_TOKEN_ERROR",
      });
    }
  }

  async getNewAccessToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: "Refresh token is required",
          code: "MISSING_REFRESH_TOKEN",
        });
      }
      const jwtAccessToken =
        await securityService.reGenerateAccessTokenFromRefreshToken(
          refreshToken
        );

      res.status(200).json(jwtAccessToken);
    } catch (error) {
      console.error("SecurityController > getNewAccessToken:", error.message);
      // next(error);

      // Instead of Global error handler, using custom generic error
      return res.status(500).json({
        success: false,
        error:
          "Invalid or expired refresh token during access token generation.",
        code: "REFRESH_TOKEN_ERROR",
      });
    }
  }
}

module.exports = new SecurityController();
