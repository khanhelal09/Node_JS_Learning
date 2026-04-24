const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const securityService = require("../services/securityService");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
} = require("../config/keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      accessType: "offline",
      prompt: "consent",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.error("GoogleStrategy > accessToken:::", accessToken);
      console.error("GoogleStrategy > refreshToken:::", refreshToken);
      // Here you can save user to DB (optional)
      const userPayload = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };
      //   // THIS LINE GENERATES THE JWT TOKEN
      //   const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "1h" });
      //   // THIS RETURNS token TO PASSPORT
      //   return done(null, { token, user: userPayload });

      const jwtTokens = await securityService.getAccessAndRefreshToken(userPayload);

      return done(null, { jwtTokens, user: userPayload });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
