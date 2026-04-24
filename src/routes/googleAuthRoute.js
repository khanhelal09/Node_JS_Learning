const express = require("express");
const passport = require("passport");
const router = express.Router();
const { jwtVerification } = require("../middleware/jwtVerify");

// Step 1: Google Login (redirect to Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback (Google → Server)
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  // Redirect to dashboard along with token
  // (req, res) => {
  //   const token = req.user.token;
  //   // Send token to frontend via cookie OR redirect with token
  //   res.cookie("token", token);
  //   res.redirect("/auth/dashboard?token=" + token);
  // }

  //Another way no need redirect, best for mobile app
  (req, res) => {
    console.error("googleAuthRoute >> callback :::", req.user);
    return res.json({
      message: "Login successful",
      token: req.user.jwtTokens,
    });
  }
  // http only cookie best approach for web app
  //   const token = generateJWT(req.user);
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: 24 * 60 * 60 * 1000
  // });
  // res.redirect("/dashboard");
);

router.get("/dashboard", (req, res) => {
  const token = req.query.token;
  res.send({
    message: "Google Login Successful",
    token: token,
  });
});

router.get("/api/profile", jwtVerification, (req, res) => {
  res.send({
    message: "Access granted",
    user: req.user,
  });
});

module.exports = router;
