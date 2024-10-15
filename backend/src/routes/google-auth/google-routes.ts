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
    const user = req.user as User;

    if (!user) {
      res.status(404).json({ msg: "No user Found" });
      return;
    }

    const { id: _id, username, email } = user;

    // generate access and refresh token
    const accessToken = jwt.sign(
      { id : _id, username, email },
      process.env.ACCESSTOKEN_PASS ?? ""
    );
    const refreshToken = jwt.sign({ id : _id }, process.env.REFRESHTOKEN_PASS ?? "");

    // sending tokens as cookie
    res.cookie(accessToken, {
      maxAge: 15 * 60 * 1000,
    });
    res.cookie(refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Successful authentication, redirect home.
    res.json({ msg: "welcome user" });
  }
);

export default router;
