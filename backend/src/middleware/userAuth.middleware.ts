import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/index.db";

// basic thing to understand here is on both signup and login user won't have either of access or refresh token. When a user is being logged out we remove/ blacklist/ delete the user's access and refresh token. So here we can't user either of them to extract the info. Rather we are generating new access and refresh token for the user.
export const userSignupAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ msg: "User already exist. Please try to login" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const userLoginAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ msg: "No such email exist. Please try Signup" });
      return;
    }
    next();
  } catch (e) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).json({ msg: "No refresh token provided" });
      return;
    }
    const valid = jwt.verify(refreshToken, process.env.REFRESHTOKEN_PASS ?? "");
    if (!valid) {
      res.status(403).json({ msg: "invalid or expired refresh token" });
      return;
    }
    next();
  } catch (e) {
    res.status(500).json({ msg: "internal server error" });
  }
};

// export const validateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.cookies;
//     // headers : refreshToken <token>
//     // since the type of token is "token : Record<string, any>" we have to split it
//     const refreshToken = token.split(" ")[1];
//     // here we won't decode instead verify the token and move forward, cuz we don't wanna find user
//     const valid = jwt.verify(refreshToken, process.env.REFRESHTOKEN_PASS ?? "");
//     if(!valid){
//       res.status(404).json({msg: "invalid refresh token"})
//     }
//     next();
//   } catch (e) {
//     res.status(500).json({ msg: "internal server error" });
//   }
// };
