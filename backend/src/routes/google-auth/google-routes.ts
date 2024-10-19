import { Request, Response, Router } from "express";
import passport from "passport";
require("./google-strategy");
import jwt from "jsonwebtoken";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// since TS don't know the structure of req.uesr we defined a type for it and did type assertion below
type User = {
  id: string;
  username: string;
  email: string;
  google_id: string;
};

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  function (req: Request, res: Response) {
    try {
      const user = req.user as User;

      if (!user) {
        res.status(404).json({ msg: "No user Found" });
        return;
      }

      const { id: _id, username, email } = user;

      // generate access and refresh token
      const accessToken = jwt.sign(
        { id: _id, username, email },
        process.env.ACCESSTOKEN_PASS ?? "", {expiresIn : '15min'}
      );
      const refreshToken = jwt.sign(
        { id: _id },
        process.env.REFRESHTOKEN_PASS ?? "", {expiresIn : '1d'}
      );

      // sending tokens as cookie
      res.cookie("accessToken", accessToken, {
        maxAge:  15 * 60 * 1000,   // this overwrites the expiresIn timeout
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge:  24 * 60 * 60 * 1000, //set to 1day
      });

      // Successful authentication, redirect home.
      res.redirect("http://localhost:5173/protectedRoute");
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error." });
    }
  }
);

router.get("/user", (req: Request, res: Response) => {
  try {
    const {accessToken} = req.cookies;
    
    if(!accessToken){
      res.status(404).json({msg : "Unausthorized User!"})
      return;
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN_PASS ?? "");
    //type for decoded object
    type UserInfo = {
      username: string;
      email: string;
      id: string;
    };
    // destructuring user information
    const { username, email, id } = decoded as UserInfo;
    // sending user info response
    res.status(200).json({ user: { username, email, id } });
  } catch (e) {
    res.status(500).json({ msg: "Error Fetching User Information." });
  }
});

export default router;
