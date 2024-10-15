import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../../db/index.db";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:3000/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const { sub, name, email } = profile._json;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          // to avoid further execution of code we returned
          return done(null, existingUser);
        }
        const newUser = await User.create({
          username: name,
          google_id: sub,
          email: email,
        });
        done(null, newUser);
      } catch (error) {
        console.log("Error during Oauth process ", error);
        done(error);
      }
    }
  )
);
