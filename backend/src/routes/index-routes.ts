import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  userLoginAuth,
  userSignupAuthentication,
  validateToken,
} from "../middleware/userAuth.middleware";
import { userLoginSchema, userSignupSchema } from "../zod/index.zod";
import { User } from "../db/index.db";

const router = Router();

router.get("/", (req, res) => {
  res.send("hello");
});
router.post(
  "/signup",
  userSignupAuthentication,
  async (req: Request, res: Response) => {
    try {
      const response = userSignupSchema.safeParse(req.body);
      if (!response.success) {
        res.status(401).json({ msg: "User credentials are invalid." });
        return;
      }

      const { username, email, password } = response.data;

      const saltRounds = 12;
      const hashedPass = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        username,
        email,
        password: hashedPass,
      });
      // before final response generate accesstoken and refresh token for user and send it as cookies
      const accessToken = jwt.sign(
        { id: user._id, username, email },
        process.env.ACCESSTOKEN_PASS ?? "",
        {
          expiresIn: "15min",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESHTOKEN_PASS ?? "",
        {
          expiresIn: "1d",
        }
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: false,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true,   // Ensure this is 'true' in production (only sent over HTTPS)
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        
      });
      res.status(200).json({ msg: "User created successfully" });
    } catch (e) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

router.post("/login", userLoginAuth, async (req: Request, res: Response) => {
  const response = userLoginSchema.safeParse(req.body);
  if (!response.success) {
    res.status(401).json({ msg: "User credentials are invalid." });
    return;
  }

  const { email, password } = response.data;

  const user = await User.findOne({ email });

  const hashedPass = user?.password;
  // compare the password with the database password.
  const passwordAuth = await bcrypt.compare(password, hashedPass ?? "");
  if (!passwordAuth) {
    res.status(401).json({
      msg: "User password is incorrect. Please enter a valid password.",
    });
    return;
  }

  // since password is correct generate access and refresh and send it as cookies

  const accessToken = jwt.sign(
    { id: user?._id, username: user?.username, email: user?.email },
    process.env.ACCESSTOKEN_PASS ?? ""
  );
  const refreshToken = jwt.sign(
    { id: user?.id },
    process.env.REFRESHTOKEN_PASS ?? ""
  );

  res.cookie('accessToken', accessToken, {
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ msg: "User Login Successfull." });
});

// refresh token router( here we won't be validating user cuz its purely for generating new access token rather validating a user.)
router.post(
  "/refreshToken",
  validateToken,
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    
    // since we are verifying valid token in middleware we can directly decode without verifying
    // complete : true means it gives us the obj that include both header and payload objects
    const decoded = jwt.decode(refreshToken, { complete: true });

    // here defined the below type because though the payload can be null it would be handled by optional chaining but TS isn't aware of how does the data look like 
    type payloadDecode = {
      id: string;
    };

    const { id } = decoded?.payload as payloadDecode;
    const user = await User.findOne({_id : id})


    const newAccessToken = jwt.sign({
      id : user?._id, 
      username : user?.username, 
      email : user?.email
    }, process.env.ACCESSTOKEN_PASS ?? "", {
      expiresIn : "15min"
    })

    res.cookie("accessToken", newAccessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly : true  // flags the cookie to be only accessible by the web-server 
    })
    
    res.status(200).json({msg : "token generation successfull"})
  }
);
export { router };
